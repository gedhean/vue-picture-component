<template>
  <div id="app">
    <ImageUploadButton v-model="image" :locale="locale"/>
    <button v-if="image" class="btn" @click="openModal">{{t('edit')}}</button>
    <Modal v-show="showModal" @close="closeModal">
      <div slot="body" class="cropper-wrapper">
        <VueCroppie
          ref="croppie"
          class="cropper"
          :enable-orientation="true"
          :enable-zoom="true"
          :enforce-boundary="true"
          :enable-exif="true"
          :enable-resize="false"
          :viewport="viewport"
        ></VueCroppie>
      </div>
      <div slot="footer" class="actions">
        <div class="rotate-buttons">
          <a href="#" class="btn button__image-rotate" @click.prevent="rotate(-90)">{{t('rotate-left')}}</a>
          <a href="#" class="btn button__image-rotate" @click.prevent="rotate(90)">{{t('rotate-right')}}</a>
        </div>
        <button class="btn btn--block" @click="crop">{{t('crop')}}</button>
      </div>
    </Modal>
    <div>
      <img class="crop-preview" v-if="imageUrl" :src="imageUrl">
    </div>
  </div>
</template>

<script>
import ImageUploadButton from "./ImageUploadButton";
import Modal from "./Modal";
import { displayMessage } from '@/helpers/utils.js';
import Uploader from '@/helpers/imageUploader.js';
import translable from '@/mixins/translable.js';

export default {
  name: "VPicture",
  mixins: [translable],
  props: {
    width: {
      type: [String, Number],
      default: 250
    },
    height: {
      type: [String, Number],
      default: 250
    },
    viewportType: {
      type: String,
      default: "square",
      validator: value => ["square", "circle"].includes(value)
    },
    locale:  String,
  },
  created () {
    this.imageUploader = new Uploader()
  },
  data() {
    return {
      image: null,
      croppedImage: null,
      showModal: false,
      imageUrl: null
    };
  },
  computed: {
    viewport() {
      return this.calculateViewport();
    }
  },
  watch: {
    image(src) {
      if (src) {
        this.openModal();
        this.bindImage();
      }
    },
    croppedImage(blod) {
      const vm = this

      this.imageUploader.upload(blod).then(location => {
        vm.imageUrl = location
      }).catch(error => {
        vm.showError()
      })
    },
    imageUrl(url) {
      console.log(url);
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    crop() {
      const { width, height } = this;
      const options = {
        type: "blob",
        format: "png",
        size: {
          width,
          height
        }
      };

      this.$refs.croppie
        .result(options)
        .then(result => (this.croppedImage = result))
        .then(() => this.closeModal());
    },
    bindImage() {
      this.$refs.croppie.bind({
        url: this.image
      });
    },
    rotate(degree) {
      this.$refs.croppie.rotate(degree);
    },
    calculateViewport() {
      let widthSize = parseInt(this.width, 10);
      let heightSize = parseInt(this.height, 10);
      let widthViewport = 250;
      let heightViewport = 250;

      if (widthSize > heightSize) {
        heightViewport = (widthViewport * heightSize) / widthSize;
      } else if (widthSize < heightSize) {
        widthViewport = (heightViewport * widthSize) / heightSize;
      }

      return {
        width: widthViewport,
        height: heightViewport,
        type: this.viewportType
      };
    },
    showError(msg) {
      // Global error message
      return displayTopMessage && displayTopMessage(msg, "error")
    } 
  },
  components: {
    ImageUploadButton,
    Modal
  }
};
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cropper {
  height: 300px;
  width: 100%;
  padding-bottom: 28px;
}
/* Trash code */
.crop-preview {
  height: 200px;
}

.rotate-buttons {
  text-align: center;
  margin-bottom: 20px;
}

.rotate-buttons .btn.button__image-rotate {
  background: #eee;
  color: #999;
  text-decoration: none;
  padding: 10px;
  font-size: 10px;
  line-height: 1;
  height: auto;
  margin-left: 4px;
  margin-right: 4px;
}

.btn {
  padding: 12px 18px;
  background: #444;
  border: 0;
  text-transform: uppercase;
  color: #fff;
  font-size: 13px;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  height: 44px;
}

a.btn {
  display: inline-block;
}

.btn--block {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
