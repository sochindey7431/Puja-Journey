# 🎵 Puja Journey — Local Music Folders

## How to Add Your Music

Simply drop your `.mp3`, `.wav`, or `.ogg` files into the correct festival folder below.
**No code editing required.**

After adding files, run the manifest generator script once:

```bash
node scripts/generate-music-manifest.js
```

This regenerates `manifest.json` in each folder so the player knows what files exist.

---

## Festival Folders

| Folder | Festival |
|--------|---------|
| `saraswati-puja/` | Saraswati Puja |
| `shivaratri/` | Maha Shivaratri |
| `dol-purnima/` | Dol Purnima (Holi) |
| `rath-yatra/` | Rath Yatra |
| `janmashtami/` | Krishna Janmashtami |
| `ganesh-chaturthi/` | Ganesh Chaturthi |
| `vishwakarma-puja/` | Vishwakarma Puja |
| `mahalaya/` | Mahalaya |
| `durga-puja-shasthi/` | Durga Puja — Shasthi |
| `durga-puja-saptami/` | Durga Puja — Saptami |
| `durga-puja-ashtami/` | Durga Puja — Ashtami |
| `durga-puja-navami/` | Durga Puja — Navami |
| `durga-puja-dashami/` | Bijoya Dashami |
| `lakshmi-puja/` | Kojagari Lakshmi Puja |
| `kali-puja/` | Kali Puja |
| `jagaddhatri-puja/` | Jagaddhatri Puja |

---

## Example

Put `dhaker-taale.mp3` into `durga-puja-ashtami/`:

```
public/music/durga-puja-ashtami/dhaker-taale.mp3
```

Then run:

```bash
node scripts/generate-music-manifest.js
```

The Durga Puja Ashtami player will automatically show "Dhaker Taale" in its playlist.

---

## Supported Formats

- `.mp3` ✅
- `.wav` ✅  
- `.ogg` ✅

---

## File Naming Tips

Use descriptive names. Underscores and hyphens are converted to spaces in the player UI:

- `maa-durga-aarti.mp3` → "Maa Durga Aarti"
- `shyama_sangeet_01.mp3` → "Shyama Sangeet 01"
