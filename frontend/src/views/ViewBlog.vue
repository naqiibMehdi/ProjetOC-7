<template>
  <div class="formBlog">
      <form method="POST" enctype="multipart/form-data">
        <textarea 
          name="description"
          id=""
          cols="30"
          rows="10"
          >
          </textarea>
          <input
            type="file"
            name="image"
            id="image"
          >
          <button type="submit">Poster</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Blog"
}
</script>

<style>
.formBlog {
  width: 450px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
}
</style>