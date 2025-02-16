<template>
  <section class="w-[90%] mx-auto pt-10 flex min-h-[100vh] gap- max-tab:flex-col">
    <div class="max-tab:h-auto w-[40%] max-tab:w-full">
        <div class="flex justify-between !mb-4">
          <span class="font-bold" @click="routeHome">Home</span>
            <!-- <arrowCircle 
            class="w-[2rem] h-[2rem]"
            @click="prevQuestion"
            /> -->
            <arrowCircle 
            class="rotate-[180deg] h-[2rem] w-[2rem]"
            @click="nextQuestion"
            />
        </div>
        <div class="flex justify-between items-center bg-[#0c0218] py-4 px-6 rounded-[0.5rem]">
            <h3 class="text-[#FFFFFF]">Goal: 30 points</h3>
            <h3 class="text-[#c9bbbb]">Current Points: {{ currentPoint }}</h3>
        </div>
        <div class="questions mt-12 max-tab:mb-4">
            <h3 class="font-bold mb-4">Question {{ questionCount + 1 }}</h3>
            <p>{{ currentQuestion?.question }}</p>
        </div>
    </div>
    <div class="px-10 max-tab:px-0 flex-1">
      <div class="options-container flex flex-col gap-4">
        <article 
          class="option flex items-center gap-4 rounded-[0.5rem] p-4 border transitionEffect cursor-pointer"
          :class="{
            'border-green-500 bg-green-100 text-black': selectedOption === index && index === currentQuestion.correctAnswer, // Correct selection
            'border-red-500 bg-red-100 text-black': selectedOption === index && index !== currentQuestion.correctAnswer, // Incorrect selection
            'border-green-500 bg-green-100 text-black': index === currentQuestion.correctAnswer && selectedOption !== null, // Highlight correct answer
            'hover:text-[#FFFFFF] hover:bg-[black]': selectedOption === null // Disable hover after selection
          }"
          v-for="(option, index) in currentQuestion?.options"
          :key="index"
          @click="checkAnswer(index)"
        >
          <h3 class="font-bold">{{ String.fromCharCode(65 + index) }}</h3>
          <h3 v-html="option"></h3>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import arrowCircle from '@/components/icons/arrowCircle.vue';
import {questions} from '@/composables/questions'
import { errorMessages, successMessages } from '@/composables/messages';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';


const questionCount = ref(0)
const isCorrect = ref(false)
const isWrong = ref(false)
const currentPoint = ref(0)
const selectedOption = ref(null); // Track the selected option
const toast = useToast();
const router = useRouter()

const routeHome = ()=>{
    resetOptions()
    router.push({ name: 'home'})
}

const currentQuestion = computed(()=>{
  return questions[questionCount.value]
})

const resetOptions = ()=>{
  selectedOption.value = null;
  isCorrect.value = false;
  isWrong.value = false
}

const nextQuestion = ()=>{
  resetOptions()
  if(questionCount.value + 1 !== questions.length){
    questionCount.value++
  }
}

// const prevQuestion = ()=>{
//   resetOptions()
//   if(questionCount.value > 0){
//     questionCount.value--
//   }
// }

const checkAnswer = (index) => {
  let correctAnswer = currentQuestion.value?.correctAnswer;
  selectedOption.value = index; // Store selected option

  if (correctAnswer === index) {
    isCorrect.value = true;
    currentPoint.value += 10;
    const successMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
    toast.success(successMsg, { timeout: 2000 });
  } else {
    isWrong.value = true;
    const errorMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    toast.error(errorMsg, { timeout: 2000 });
  }
};

</script>

<style lang="scss" scoped>

</style>