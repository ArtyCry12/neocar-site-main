`forklift.glb` — рабочая модель (источник: Meshy AI экспорт в корне репозитория).

Файл тяжёлый (~38 MB): для продакшена лучше сжать Draco/WebP и CDN:

```
npx @gltf-transform/cli optimize forklift.glb forklift-opt.glb --texture-compress webp
```

Placeholder включается переменной `NEXT_PUBLIC_HERO_USE_GLB=false`.
