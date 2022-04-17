<template>
  <div>
      <div>
        <input type="text" name="ezberkelime" v-model="kelime.kelime" class="border-2 w-[500px] px-4 py-4 rounded text-lg font-semibold" :class="answerClass" disabled>

      <div v-if="rand==0" class="mt-4 flex">
        <button @click="openModel(1)" class="mr-1 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><i class="fa fa-volume-up"></i></button>
        <button @click="openModel(2)" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><i class="fa fa-volume-up"></i></button>
      </div>

        <div class="flex mt-4">
          <div v-if="butonText==0" class="flex mt-8 mb-14">
            <div v-for="i in shuffleArray" :key="i.id">
              <a @click="enterWord(i.id)" class="bg-purple-700 px-6 py-2 cursor-pointer rounded text-white mr-2">{{i.kelime}}</a>
            </div>
          </div>

          <div  v-if="butonText==1" class="flex mt-8 mb-8">
            <input type="text" @keyup.enter="enterWord(0)" name="ezberkelime" v-model="cevap" placeholder="Cevabı buraya yazın" class="border-2 w-[500px] px-2 py-2 rounded text-lg font-semibold" autocomplete="off">
          </div>
        </div>
        <div>
          <a @click="newWord" class="bg-red-600 px-6 py-2 cursor-pointer rounded text-white mr-2">Başka Kelime Sor</a>

          <div class="flex flex-col mt-8 mb-8">
            <span class="bg-green-100 px-5 py-2 lg:w-1/6 sm:1/1 rounded flex justify-between mb-1"><span>Doğru Sayısı</span> <span>{{dogruCevap}}</span></span>
            <span class="bg-red-100 px-5 py-2 lg:w-1/6 sm:1/1 rounded flex justify-between"><span>Yanlış Sayısı</span> <span>{{yanlisCevap}}</span></span>
          </div>
        </div>
        <div class="w-full bg-gray-200">
          <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded" :style="{width: yuzde+'%'}"> {{yuzde}}% </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="">
<div v-if="isModal" id="defaultModal" aria-hidden="true" class="overflow-y-auto  overflow-x-hidden min-w-full mx-auto fixed right-0 left-0 top-4 z-50 justify-center items-center h-full md:inset-0 bg-gray-700 bg-opacity-80">
    <div class="relative px-4 w-7/12 mx-auto mt-11 h-screen">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex justify-between items-start px-3 py-2 rounded-t border-b dark:border-gray-600">

                <button @click="isModal = false"  type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
               <iframe :src="modalUrl" frameborder="0" width="100%" height="800px"></iframe>
            </div>

        </div>
    </div>
  </div>
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isModal: false,
      modalUrl: null,
      kelime: "",
      rand: 1, //0 yabancı, 1 türkçe
      currentWord: null,
      currentLanguage: [], //rasgele üç kalime seçilerek butonlara atanacak
      index: 0,
      dogruCevap: 0,
      yanlisCevap: 0,
      getYKelime: [],
      getTKelime: [],
      buttonArray: [],
      shuffleArray: [],
      answer: false,
      answerClass: '',
      yuzde: 0,
      butonText: 0,
      cevapKelime: '',
      cevap: ''
    }
  },
  components:{

  },
  created() {
    if(this.$store.getters.getYKArray == null){
      this.$router.push({name: 'YeniEzber'})
    }
    this.getYKelime = this.$store.getters.getYKArray;
    this.getTKelime = this.$store.getters.getTKArray;
    setTimeout(() => {
        this.getRandom()
      }, 500);
  },
  computed:{
    yuzde: function(){
      return Math.floor(this.dogruCevap/(this.dogruCevap+this.yanlisCevap)*100)
    }
  },
  methods: {
    openModel(type){
      this.isModal = true
      if(type==1){
        this.modalUrl = `https://dictionary.cambridge.org/tr/okunuş/ingilizce/` + this.kelime.kelime
      }else if(type == 2){
        this.modalUrl = `https://tureng.com/tr/turkce-ingilizce/` + this.kelime.kelime
      }
    },
    newWord(){
      setTimeout(() => {
        this.getRandom()
      }, 500);
    },
    enterWord(id){
      if(this.butonText==0){
        if(id==this.index )
        {
          this.dogruCevap++
          this.answerClass = 'bg-green-500'
        }
        else
        {
          this.yanlisCevap++
          this.answerClass = 'bg-red-500'
        }
      }else{
        debugger;
        if(this.cevapKelime.toLowerCase() === this.cevap.toLowerCase())
        {
          this.dogruCevap++
          this.answerClass = 'bg-green-500'
        }
        else
        {
          this.yanlisCevap++
          this.answerClass = 'bg-red-500'
        }
      }

      setTimeout(() => {
        this.getRandom()
      }, 500);

    },
    getRandom(){
      this.answerClass = ''
      this.cevap = ''
      let rKelime = (Math.floor(Math.random() * (this.$store.getters.getYKArray.length - 1 + 1)) + 1)
      let sayi = (Math.floor(Math.random() * (2 - 1 + 1)) + 1)-1
      this.butonText = (Math.floor(Math.random() * (2 - 1 + 1)) + 1)-1

      this.index = rKelime
      this.rand = sayi

      if(sayi == 0){
        this.kelime = this.getYKelime.filter(i => i.id==rKelime)[0];
        this.shuffle(this.getTKelime.filter(i => i.id != rKelime),2)
        this.cevapKelime = this.getTKelime.filter(i => i.id==rKelime)[0].kelime
        this.shuffleArray.push(
          {
            id: this.kelime.id,
            kelime: this.getTKelime.filter(i => i.id==rKelime)[0].kelime
          }
        )
        this.shuffle(this.shuffleArray,3);
      }else if(sayi == 1){
        this.kelime = this.getTKelime.filter(i => i.id==rKelime)[0];
        this.shuffle(this.getYKelime.filter(i => i.id != rKelime),2)
        this.cevapKelime = this.getYKelime.filter(i => i.id==rKelime)[0].kelime
        this.shuffleArray.push(
          {
            id: this.kelime.id,
            kelime: this.getYKelime.filter(i => i.id==rKelime)[0].kelime
          }
        )
        this.shuffle(this.shuffleArray,3);
      }
      console.log("Karışık", this.shuffleArray)
    },
    shuffle(val, limit){
      let first, second, temp,
      count = val.length;
      for (let i = 0; i < count; i++) {
        first = Math.floor(Math.random() * count);
        second = Math.floor(Math.random() * count);
        temp = val[first];
        val[first] = val[second];
        val[second] = temp;
      }

      this.shuffleArray = val.slice(0,limit);

    }
  },
}
</script>
