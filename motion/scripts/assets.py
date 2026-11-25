"""Download photos (and clips) for a video from a Google Drive folder or file link.

  npm run assets -- <Drive folder or file link> <slug>

The folder/file must be shared as "Anyone with the link". Files land in
public/videos/<slug>/assets/; photos are converted to JPG (HEIC included),
rotated upright and capped at 2400 px. A numbered contact sheet
(assets/_contact-sheet.jpg) is written so the photos can be reviewed at a
glance. Use them in plan.json as "videos/<slug>/assets/<file>.jpg".
"""

import os
import re
import shutil
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp", ".tif", ".tiff"}
VIDEO_EXT = {".mp4", ".mov", ".m4v"}


def slugify(name: str) -> str:
    base, ext = os.path.splitext(name)
    s = re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-") or "file"
    return s, ext.lower()


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1
    link, slug = sys.argv[1], sys.argv[2]
    try:
        import gdown
        from PIL import Image, ImageDraw, ImageOps
    except ImportError:
        print("Missing tools: pip install gdown pillow pillow-heif", file=sys.stderr)
        return 2
    try:
        from pillow_heif import register_heif_opener

        register_heif_opener()
    except ImportError:
        pass  # HEIC photos will be skipped with a message

    out_dir = os.path.join(ROOT, "public", "videos", slug, "assets")
    os.makedirs(out_dir, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="drive-")
    try:
        folder = re.search(r"/folders/([\w-]+)", link)
        try:
            if folder:
                got = gdown.download_folder(id=folder.group(1), output=tmp, quiet=False, use_cookies=False)
            else:
                fid = re.search(r"(?:/file/d/|[?&]id=)([\w-]+)", link)
                if not fid:
                    print("That doesn't look like a Google Drive file or folder link.", file=sys.stderr)
                    return 1
                got = gdown.download(id=fid.group(1), output=tmp + os.sep, quiet=False, use_cookies=False)
                got = [got] if got else None
        except Exception as e:  # gdown raises on private links and refused connections
            got = None
            print(f"Download error: {e}", file=sys.stderr)
        if not got:
            print(
                "\nCould not download. In Drive: Share -> General access -> 'Anyone with the link'.\n"
                "If the network refused it, start the chat in the 'outfit' environment.",
                file=sys.stderr,
            )
            return 1

        saved, skipped = [], []
        for dirpath, _, files in os.walk(tmp):
            for f in sorted(files):
                src = os.path.join(dirpath, f)
                base, ext = slugify(f)
                if ext in IMAGE_EXT:
                    try:
                        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
                        im.thumbnail((2400, 2400))
                        name = f"{base}.jpg"
                        n = 2
                        while os.path.exists(os.path.join(out_dir, name)):
                            name = f"{base}-{n}.jpg"
                            n += 1
                        im.save(os.path.join(out_dir, name), quality=90)
                        saved.append((name, im.size))
                    except Exception as e:
                        skipped.append(f"{f} ({e.__class__.__name__}: install pillow-heif for HEIC)")
                elif ext in VIDEO_EXT:
                    name = f"{base}{ext}"
                    shutil.copyfile(src, os.path.join(out_dir, name))
                    saved.append((name, None))
                else:
                    skipped.append(f)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    photos = [(n, s) for n, s in saved if s]
    if photos:
        tw, th, cols = 300, 300, 5
        rows = (len(photos) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * tw, rows * (th + 28)), "white")
        d = ImageDraw.Draw(sheet)
        for i, (name, _) in enumerate(photos):
            im = Image.open(os.path.join(out_dir, name))
            im.thumbnail((tw - 8, th - 8))
            x, y = (i % cols) * tw, (i // cols) * (th + 28)
            sheet.paste(im, (x + (tw - im.width) // 2, y + (th - im.height) // 2))
            d.text((x + 6, y + th + 6), f"{i + 1}. {name}"[:44], fill="black")
        sheet.save(os.path.join(out_dir, "_contact-sheet.jpg"), quality=85)

    print(f"\nSaved {len(saved)} file(s) to public/videos/{slug}/assets/")
    for name, size in saved:
        kind = f"{size[0]}x{size[1]}" if size else "video"
        print(f"  videos/{slug}/assets/{name}  ({kind})")
    if skipped:
        print("Skipped: " + ", ".join(skipped))
    if photos:
        print(f"Contact sheet: public/videos/{slug}/assets/_contact-sheet.jpg")
    return 0


if __name__ == "__main__":
    sys.exit(main())
