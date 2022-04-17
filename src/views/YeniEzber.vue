<template>
  <div>
    <div class="flex flex-col mb-6">
      <span class="font-semibold">Ezberlenecek kelimeleri aşağıya yazınız.</span>
      <small>Her satırda bir kelime yazılacaktır.</small>
    </div>
    <div class="flex w-full mb-8">
      <div class="flex flex-col mr-10">
        Yabancı Kelimeler:
        <textarea v-model="YabanciKelime" class="border-2 border-gray-200 rounded px-2 py-2 w-96" name="yabanci_kelimeler" rows="7"></textarea>
      </div>
      <div class="flex flex-col">
        Türkçe Kelimeler:
        <textarea v-model="TurkceKelime" class="border-2 border-gray-200 rounded px-2 py-2 w-96" name="yabanci_kelimeler" rows="7"></textarea>
      </div>
    </div>
    <a @click="KelimeleriEkle" class="bg-red-700 px-8 py-2 rounded cursor-pointer text-white">Ekle</a>
  </div>
</template>

<script>
export default {
  data(){
    return{
      YabanciKelime: 'Apple\nBanana\nDay\nMoon',
      TurkceKelime: 'Elma\nMuz\nGün\nAy',
    }
  },
  created(){
    this.$store.commit("SetYabanciKelime", null)
    this.$store.commit("SetTurkceKelime", null)
  },
  methods: {
    KelimeleriEkle(){
      if(this.KelimeUzunluk(this.YabanciKelime) == 0 || this.KelimeUzunluk(this.TurkceKelime) == 0){
        alert("En az bir satır girmeniz gerekiyor")
      }else if(this.KelimeUzunluk(this.YabanciKelime) != this.KelimeUzunluk(this.TurkceKelime)){
        alert("Kelimeler aynı sayıda değil")
      }else{

        let tempYK = []
        let tempTK = []

        let yk = this.YabanciKelime.split("\n")
        let tk = this.TurkceKelime.split("\n")

        let i = 1
        let ii = 1
        Array.from(yk).forEach(element =>
              tempYK.push({id:i++, kelime:element})
        );

        Array.from(tk).forEach(element =>
              tempTK.push({id:ii++, kelime:element})
        );

        this.$store.commit("SetYabanciKelime",tempYK)
        this.$store.commit("SetTurkceKelime",tempTK)
        this.$router.push({name: 'Ezber'})
      }
    },
    KelimeUzunluk(val){
      if(val == null) return 0;
      return val.length ? val.split(/\r\n|\r|\n/).length : 0;
    }
  },
}
</script>
