<template>
    <section class="min-h-[100vh] pt-10 bg-[#f3edfc]">
        <div class="">
            <div class="basicFlex justify-between items-center w90">
                <span class="font-bold">Lesson {{ lessonCount.toLocaleString() }}</span>
               <!-- <span class="basicFlex gap-[0.5rem] border rounded-[0.5rem] p-[0.5rem]">
                <timerIcon />
                00:12
               </span> -->
            </div>
            <div class="mx-auto mt-12 w90 max-tab:w-full">
                <h1 class="text-center font-bold text-[2rem]">Match the Algebraic Terms!</h1>
                <div class="grid grid-cols-2 w-full mt-10 gap-4 max-tab:grid-cols-1">
                    <div class="flex flex-wrap justify-center gap-4 max-tab:w-[95%] mx-auto max-mob:w-full">
                        <article 
                        class="border-dashed border-[#d5bdf4] border-2 h-[12rem] max-mob:h-auto grid place-items-center text-center rounded-[0.5rem] p-10 bg-[#f3edfc] w-[48%] max-mob:w-[40%] cursor-pointer max-mob:p-4"
                        v-for="(question, index) in dragQuestions"
                        :key="index"
                        @dragover.prevent
                        @drop="dropAnswer($event, index)"
                        :class="{
                            'bg-green-200 border-green-500': question.isCorrect,
                            'bg-red-200 border-red-500': question.isWrong
                        }"
                        >
                            <h3 class="font-bold text-[#b7abab] text-center max-mob:!text-[0.7rem]">{{ question.selectedAnswer || question.question }}</h3>
                        </article>
                        
                    </div>
    
                    <div class="max-tab:mt-20 max-tab:bg-white max-tab:p-6 max-tab:rounded-t-[4rem] max-mob:p-4">
                        <h3 class="text-center text-[1.5rem] mb-10 max-mob:text-[1.2rem]">Drag the correct algebraic term below to match it's definition above</h3>
                        <div class="terms-container flex flex-wrap justify-center gap-4">
                            <article class="rounded-[0.5rem] bg-black p-4 py-12 grid place-items-center w-[30%] cursor-pointer hover:scale-105 transitionEffect max-mob:p-4" v-for="(option, index) in dragQuestions"
                            draggable="true"
                            @dragstart="dragStart($event, option.answer)"
                            >
                                <h3 class="text-white max-mob:text-[0.7rem]">{{ option.answer }}</h3>
                            </article>
                        </div>
                        <div class="mt-10 w-[70%] mx-auto basicFlex justify-center gap-10">
                            <span 
                            class="p-4 border border-black rounded-[0.5rem] cursor-pointer"
                            @click="resetGame"
                            >
                                <refreshIcon class="text-black"/>
                            </span>
                            <button class="basicFlex gap-4 bg-black p-4 rounded-[0.5rem] cursor-pointer" @click="routeHome">
                                <h3 class=" text-white">Continue</h3>
                                <arrowIcon class="rotate-[180deg] text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// import timerIcon from '@/components/icons/timerIcon.vue'
import { dragQuestions } from '@/composables/questions';
import { ref } from 'vue';
import { useToast } from 'vue-toastification'
import { successMessages, errorMessages } from '@/composables/messages';
import refreshIcon from '@/components/icons/refreshIcon.vue'
import arrowIcon from '@/components/icons/arrowIcon.vue'
import { useRouter } from 'vue-router'

const lessonCount = ref(1.0)
const toast = useToast()
const router = useRouter();

const routeHome = ()=>{
    resetGame()
    router.push({ name: 'home'})
}

const dragStart = (event, answer) => {
    event.dataTransfer.setData("text/plain", answer)
}

const dropAnswer = (event, questionIndex) => {
    const draggedAnswer = event.dataTransfer.getData("text/plain");

    if(dragQuestions[questionIndex].selectedAnswer){
        return;
    }

    dragQuestions[questionIndex].selectedAnswer = draggedAnswer
    console.log(draggedAnswer, dragQuestions[questionIndex])

    if(draggedAnswer.toLowerCase().trim() === dragQuestions[questionIndex].answer?.toLowerCase().trim() ){
        dragQuestions[questionIndex].isCorrect = true;
        dragQuestions[questionIndex].isWrong = false;
        const successMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
        toast.success(successMsg, { timeout: 3000 });
    } else {
        dragQuestions[questionIndex].isCorrect = false;
        dragQuestions[questionIndex].isWrong = true;
        const errorMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        toast.error(errorMsg, { timeout: 3000 });
    }

    lessonCount.value += 0.1;
    
}

const resetGame = () => {
  dragQuestions.forEach((q) => {
    q.selectedAnswer = null;
    q.isCorrect = false;
    q.isWrong = false;
  });

  lessonCount.value = 1.0;
};

</script>

<style lang="scss" scoped>

</style>