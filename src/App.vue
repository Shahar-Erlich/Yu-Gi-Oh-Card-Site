<template >
<!-- Parent div -->
  <div class="parent">
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
   <div class="child" v-if="show">
    <h1>{{ this.cardName }}</h1>
    <p>{{ this.cardType }}</p>
    <p>{{ this.cardDesc }}</p>
    <p>{{ this.cardATK }}</p>
    <p>{{ this.cardDEF }}</p>
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.btnget:disabled {
  background-color: #444; /* Darker background for disabled state */
  cursor: not-allowed;
  opacity: 0.6; /* Slightly transparent */
}
.btnget{
  width: 200px;
  height: 100px;
}
.btndiv{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -10%;
}
.parent {
    margin: 1rem;
    padding: 2rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .child {
    display: inline-block;
    padding: 1rem 1rem;
    vertical-align: middle;
  }
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
