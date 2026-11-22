<template>
  <!-- Ilustrasi komponen; bukan konten interaktif. -->
  <div aria-hidden="true" inert class="flex h-full flex-col justify-center gap-4 p-6 md:p-8">
    <div class="flex flex-wrap gap-2.5">
      <UiButton tabindex="-1">Simpan</UiButton>
      <UiButton variant="secondary" tabindex="-1">Batal</UiButton>
    </div>
    <div class="rounded-[8px] border-[1.5px] border-accent bg-surface px-3.5 py-3 text-sm text-muted">
      Nama merchant
    </div>
    <div class="flex flex-wrap gap-2">
      <UiTag v-for="t in ['Button', 'Input', 'Dialog', 'Select', 'Toast']" :key="t">{{ t }}</UiTag>
    </div>
    <div class="flex items-center gap-2.5">
      <span class="relative h-5 w-9 rounded-full bg-accent">
        <span class="absolute top-0.5 right-0.5 size-4 rounded-full bg-surface" />
      </span>
      <span class="text-sm font-medium text-ink">Mode gelap</span>
    </div>
  </div>
</template>
