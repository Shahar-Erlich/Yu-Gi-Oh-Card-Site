<template >
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Parent div -->
<Modal :isVisible="isModalVisible" :imageSrc="selectedImage" @update:isVisible="isModalVisible = $event"/>
  <div class="grid grid-cols-[370px_600px]">
<!-- Card div -->
  <div class="flip-card inline-block" :class="{'-translate-x-10': firstTime==false, 'transition-transform duration-500': true}" >
    <div class="flip-card-inner" :class="{ flipped: isFlipped }">
      <div class="flip-card-front">
       <img draggable="false" class="transform transition-transform duration-300 hover:scale-125 w-16  md:w-32 lg:w-90 xl:w-96 z-10":src="this.cardImage" alt="/CardBack.jpg" @click="openModal">
      </div>
     <div class="flip-card-back">
       <img src="/CardBack.jpg" draggable="false" class="w-16  md:w-32 lg:w-90 xl:w-96">
     </div>
    </div>
  </div>

<!--style="width:369.5454px;height:538.63px;"-->
  <!-- Info div-->
    <div :class="{'opacity-0': !show, 'opacity-100': show}" class=" text-white transition-opacity duration-500 ease-in-out" style="text-align: left;">
      <h1  class="cardName">{{ this.cardName }}</h1>
      <p>{{ this.cardLvl }}</p>
      <div>
        <p class="font-custom3 inline-block"><img draggable="false" class="w-7 h-7 inline-block" v-if="this.attImg" :src="this.attImg">{{ this.cardATT }}</p>
        <p class="font-custom3 inline-block">&nbsp;&nbsp;{{ this.cardRace }}</p>
      </div>
      <p class="font-custom3">{{ this.cardType }}</p>
     <p v-if="!isSpell" class="infoBG font-custom3">{{ this.cardATK}}/{{ this.cardDEF }}</p>
     <p class="font-custom2">{{ this.cardDesc }}</p>
     </div>
</div>
<div class="btndiv">
<button @click="btnC" class="btnget" :disabled="isButtonDisabled">Randomize!</button>
</div>
</template>


<script>
import Modal from './Modal.vue';
import { h, ref } from 'vue';
export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      show : true,
      render: false,
      isModalVisible: false,
      cardName: "",
      cardType: "",
      cardDesc: "",
      cardATK: "",
      cardDEF: "",
      cardLvl: "",
      cardRace: "",
      cardATT: "",
      attImg: "",
      isSpell:true,
      cardImage: "/CardBack.jpg",
      selectedImage:"",
      firstTime: true,
      time: "",
      isFlipped: true, // State to manage the flip
    };
  },
  computed: {
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      console.log(this.isModalVisible);
      console.log(this.selectedImage);
    },
    closeModal() {
      this.$emit('update:isVisible', false);
    },
    btnC(){
      if (this.isButtonDisabled) return; // Prevent action if button is disabled
      this.isButtonDisabled = true; // Disable the button
      this.fetchData();
    // console.log(this.firstTime);
     // console.log(this.isFlipped);
      if(this.firstTime==false){
      this.flipCard();
      }
      this.show = !this.show;
      if(this.firstTime){
        this.firstTime=false;
      }
    },
    fetchData() {
      fetch('/api/api/v7/randomcard.php')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0].name);
        this.cardName = data.data[0].name;
        this.cardType = data["data"][0]["type"];
        this.cardDesc = data["data"][0]["desc"];
        this.cardATK = data["data"][0]["atk"];
        this.cardDEF = data["data"][0]["def"];
        this.cardLvl = data["data"][0]["level"];
        this.cardRace = data["data"][0]["race"];
        this.cardATT = data["data"][0]["attribute"];
        if(this.cardType.includes("onster")){
        this.attImg = "/General Card Assets/" + this.cardATT + ".png"
        }
        else{
          this.cardType.includes("Spell") ? this.attImg ="/General Card Assets/SPELL.png":this.attImg ="/General Card Assets/TRAP.png"
        }
        if((String)(data["data"][0]["type"]).includes("Monster")){
          this.cardImage = "/Monsters/";
          this.isSpell=false;
        }
        else{
          this.cardImage = "/Spells_Traps/";
          this.isSpell =true;
        }
        this.cardImage += this.cardName.replace(/[/\\?%*:|"<>]/g, '') +".jpg";
        this.selectedImage = this.cardImage;
        this.flipCard();
      this.show =!this.show;
      this.isButtonDisabled = false; // Re-enable the button 

        console.log(this.cardImage);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    }, flipCard() {
      this.isFlipped = !this.isFlipped; // Toggle flip state
      //console.log(this.isFlipped);
    },
  },
};

</script>

<style>

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 369.5454px;
  transform-origin: 50% 50%; /* Center the flip */
  height: 568.63px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
 .flip-card-inner {
  position: relative;
  width: 369.5454px;
  height: 568.63px;
  text-align: center;
  transition: transform 0.8s;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
}

.flipped {
  transform: rotateY(-180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */

/* Style the back side */
.flip-card-back {
  transform: rotateY(180deg);
}
</style>
