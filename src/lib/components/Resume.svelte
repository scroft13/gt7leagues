<script lang="ts">
  import * as pdfjs from 'pdfjs-dist';
  import { tick } from 'svelte';
  const scale = 1.8;
  export let totalPages = 1;
  export let url: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pdfDoc: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pages: any[] = [];

  let canvas: HTMLCanvasElement;
  let pageNum = 1;
  const password = ' ';
  let pageNumPending: boolean | null = null;
  let isInitialized = false;
  let rotation = 0;

  const queueRenderPage = (page: number) => {
    renderPage(page);
  };

  function renderPage(num: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfDoc.getPage(num).then(function (page: any) {
      let viewport = page.getViewport({ scale: scale, rotation: rotation });

      const canvasContext = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      let renderContext = {
        canvasContext,
        viewport,
      };
      let renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        if (pageNumPending !== null) {
          if (pageNum < pdfDoc.totalPage) {
            pages[pageNum] = canvas;
            pageNum++;
            pdfDoc.getPage(pageNum).then(renderPage);
          } else {
            for (let i = 1; i < pages.length; i++) {
              canvas.appendChild(pages[i]);
            }
          }
          pageNumPending = null;
        }
      });
    });
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `${new URL(
    'pdfjs-dist/build/pdf.worker.js',
    import.meta.url,
  )}`;

  const initialLoad = async () => {
    let loadingTask = pdfjs.getDocument({
      ...(url && { url }),
      ...(password && { password }),
    });
    loadingTask.promise.then(async function (pdfDoc_) {
      pdfDoc = pdfDoc_;
      await tick();
      isInitialized = true;
    });
  };

  $: if (isInitialized) {
    queueRenderPage(pageNum);
  }

  initialLoad();
</script>

<div class="absolute flex w-full text-secondary justify-between top-0 px-4 pt-4 max-w-full z-[1]">
  <button
    class="p-2 text-primary border-primary border rounded disabled:disabled-text disabled:disabled-border"
    on:click={() => {
      pageNum--;
    }}
    disabled={pageNum === 1}>Previous Page</button
  >
  <button
    class="p-2 text-primary border-primary border rounded disabled:disabled-text disabled:disabled-border"
    on:click={() => {
      pageNum++;
    }}
    disabled={pageNum === totalPages}>Next Page</button
  >
</div>
<div class="relative h-full overflow-x-auto w-full bg-primary">
  <canvas bind:this={canvas} class="w-[1100px] overflow-clip mb-1" />
</div>
