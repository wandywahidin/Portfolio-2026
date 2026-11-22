<template>
  <!-- Ilustrasi alur panduan interaktif. -->
  <div aria-hidden="true" class="flex h-[260px] flex-col justify-center p-5 md:h-[320px] md:p-7">
    <div class="relative h-[210px] w-full overflow-hidden rounded-[8px] border border-line bg-surface">
      <div class="h-7 w-full bg-line" />
      <div class="absolute top-12 left-5 h-2 w-[180px] max-w-[60%] rounded bg-line" />
      <div class="absolute top-[68px] left-5 h-2 w-[120px] max-w-[40%] rounded bg-line" />
      <div class="absolute top-[100px] left-5 h-2 w-[240px] max-w-[75%] rounded bg-line" />
      <div class="absolute top-[116px] left-5 h-2 w-[200px] max-w-[65%] rounded bg-line" />
      <div class="absolute top-[148px] left-5 h-[30px] w-[110px] rounded-[6px] bg-ink" />
      <span class="absolute top-[150px] left-[112px] size-[26px] rounded-full bg-accent/30" />
      <span class="absolute top-[157px] left-[119px] size-3 rounded-full bg-accent" />
      <div
        class="absolute top-[146px] left-[152px] flex flex-col gap-1 rounded-[8px] bg-ink px-3 py-2.5 whitespace-nowrap text-on-accent"
      >
        <span class="font-mono text-[11px]">Langkah 2 dari 4</span>
        <span class="text-[13px] font-semibold">Klik di sini untuk mulai.</span>
      </div>
    </div>
  </div>
</template>
