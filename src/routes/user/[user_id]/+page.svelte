<script>
  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data.title);
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
