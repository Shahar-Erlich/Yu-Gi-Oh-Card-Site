<template >
<!-- Parent div -->
  <div class="grid grid-cols-2">
<!-- Card div -->
  <div class="flip-card child">
    <div class="flip-card-inner" :class="{ flipped: isFlipped }">
      <div class="flip-card-front">
       <img :src="this.cardImage" alt="/CardBack.jpg" style="width:369.5454  px;height:538.63px;">
      </div>
     <div class="flip-card-back">
       <img src="/CardBack.jpg" style="width:369.5454px;height:538.63px;">
     </div>
    </div>
  </div>

  <Transition>
  <!-- Info div-->
   <div class="child text-white" v-if="show" style="text-align: left;">
    <h1  class="text-3xl font-bold underline">{{ this.cardName }}</h1>
    <p>{{ this.cardType }}</p>
    <p>{{ this.cardDesc }}</p>
    <p>{{ this.cardATK}}/{{ this.cardDEF }}</p>
    <p>{{ this.cardLvl }}</p>
    <p>{{ this.cardRace }}</p>
    <p>{{ this.cardATT }}</p>
   </div>
  </Transition>
</div>
<div class="btndiv">
<button @click="btnC" class="btnget" :disabled="isButtonDisabled">Get Card!</button>
</div>
</template>


<script>
import { h, ref } from 'vue';
export default {
  name: 'App',
  data() {
    return {
      show : true,
      render: false,

      cardName: "",
      cardType: "",
      cardDesc: "",
      cardATK: "",
      cardDEF: "",
      cardLvl: "",
      cardRace: "",
      cardATT: "",
      cardImage: "/CardBack.jpg",
      firstTime: true,
      time: "",
      isFlipped: false, // State to manage the flip
    };
  },
  computed: {
  },
  methods: {
    btnC(){
      if (this.isButtonDisabled) return; // Prevent action if button is disabled
      this.isButtonDisabled = true; // Disable the button
      this.fetchData();
      this.flipCard();
      this.show = !this.show;
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



        if((String)(data["data"][0]["type"]).includes("Monster")){
          this.cardImage = "/Monsters/";
        }
        else{
          this.cardImage = "/Spells_Traps/";
        }
        this.cardImage += this.cardName.replace(/[/\\?%*:|"<>]/g, '') +".jpg";
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
    },
  },
};

</script>

<style>

</style>
