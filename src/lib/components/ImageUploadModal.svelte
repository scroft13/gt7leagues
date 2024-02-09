<script lang="ts">
  import { supabase } from '$lib/db';
  let file: File;
  const handleFileChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    file = event.target?.files[0];
  };

  const uploadImage = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('userImages')
      .upload(`user_${Date.now()}_${file.name}`, file);

    if (error) {
      console.error('Error uploading image:', error.message);
    } else {
      console.log('Image uploaded successfully:', data);
    }
  };
</script>

<h1 class="text-2xl font-semibold mb-4">Image Upload</h1>
<input type="file" accept="image/*" on:change={handleFileChange} class="mb-4" />
<button on:click={uploadImage} class="bg-blue-500 text-white px-4 py-2 rounded">Upload Image</button
>
