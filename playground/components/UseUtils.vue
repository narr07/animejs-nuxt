<template>
  <div class="container mx-auto p-4 space-y-6">
    <!-- Random Color Demo -->
    <section class="card">
      <h2 class="card-title">Random Color Demo</h2>
      <div class="flex space-x-4 mb-4">
        <div
          ref="box"
          class="box"
          :style="{ backgroundColor: randomColor1 }"
        >
          Box 1
        </div>
        <div
          ref="box2"
          class="box"
          :style="{ backgroundColor: randomColor2 }"
        >
          Box 2
        </div>
      </div>
      <button @click="randomize" class="btn">Random Color 1</button>
      <button @click="randomize2" class="btn ml-2">Random Color 2</button>
    </section>

    <!-- Random Pick Demo -->
    <section class="card">
      <h2 class="card-title">Random Pick Demo</h2>
      <button @click="handleRandomPick" class="btn mb-2">Pick Random Option</button>
      <div>Picked: <strong>{{ randomPickResult }}</strong></div>
    </section>

    <!-- Lerp Demo -->
    <section class="card">
      <h2 class="card-title">Lerp (Linear Interpolation) Demo</h2>
      <div class="flex space-x-4 mb-2">
        <label>
          Start:
          <input type="number" v-model.number="lerpStart" class="input" />
        </label>
        <label>
          End:
          <input type="number" v-model.number="lerpEnd" class="input" />
        </label>
        <label>
          Progress:
          <input type="range" min="0" max="1" step="0.01" v-model.number="lerpProgress" class="input-range" />
          <span>{{ lerpProgress.toFixed(2) }}</span>
        </label>
      </div>
      <button @click="calculateLerp" class="btn mb-2">Calculate Lerp</button>
      <div>Result: <strong>{{ lerpResult }}</strong></div>
    </section>

    <!-- Clamp Demo -->
    <section class="card">
      <h2 class="card-title">Clamp Demo</h2>
      <div class="flex space-x-4 mb-2">
        <label>
          Value:
          <input type="number" v-model.number="clampValue" class="input" />
        </label>
        <label>
          Min:
          <input type="number" v-model.number="clampMin" class="input" />
        </label>
        <label>
          Max:
          <input type="number" v-model.number="clampMax" class="input" />
        </label>
      </div>
      <button @click="calculateClamp" class="btn mb-2">Clamp Value</button>
      <div>Result: <strong>{{ clampResult }}</strong></div>
    </section>

    <!-- Round & Round Pad Demo -->
    <section class="card">
      <h2 class="card-title">Round & Round Pad Demo</h2>
      <div class="flex space-x-4 mb-2">
        <label>
          Number:
          <input type="number" v-model.number="roundValue" class="input" />
        </label>
        <label>
          Precision:
          <input type="number" v-model.number="roundPrecision" class="input" min="0" />
        </label>
      </div>
      <button @click="calculateRound" class="btn mr-2">Round</button>
      <button @click="calculateRoundPad" class="btn">Round Pad</button>
      <div class="mt-2">
        <div>Round Result: <strong>{{ roundResult }}</strong></div>
        <div>Round Pad Result: <strong>{{ roundPadResult }}</strong></div>
      </div>
    </section>

    <!-- Shuffle Demo -->
    <section class="card">
      <h2 class="card-title">Shuffle Demo</h2>
      <button @click="shuffleList" class="btn mb-2">Shuffle List</button>
      <div>List: <strong>{{ shuffleResult.join(', ') }}</strong></div>
    </section>

    <!-- Conversion Demo -->
    <section class="card">
      <h2 class="card-title">Conversion Demo (Deg & Rad)</h2>
      <div class="flex space-x-4 mb-2">
        <label>
          Degrees:
          <input type="number" v-model.number="degInput" class="input" />
        </label>
        <button @click="convertDegToRad" class="btn self-center">Convert to Radians</button>
        <div class="self-center ml-4">Radians: <strong>{{ degToRadResult.toFixed(4) }}</strong></div>
      </div>
      <div class="flex space-x-4 mt-4">
        <label>
          Radians:
          <input type="number" v-model.number="radInput" class="input" />
        </label>
        <button @click="convertRadToDeg" class="btn self-center">Convert to Degrees</button>
        <div class="self-center ml-4">Degrees: <strong>{{ radToDegResult.toFixed(4) }}</strong></div>
      </div>
    </section>

    <!-- String Padding Demo -->
    <section class="card">
      <h2 class="card-title">String Padding Demo</h2>
      <div class="flex space-x-4 mb-2">
        <label>
          String:
          <input type="text" v-model="padString" class="input" />
        </label>
        <label>
          Length:
          <input type="number" v-model.number="padLength" class="input" min="0" />
        </label>
        <label>
          Pad Char:
          <input type="text" v-model="padChar" maxlength="1" class="input" />
        </label>
      </div>
      <button @click="applyPadStart" class="btn mr-2">Pad Start</button>
      <button @click="applyPadEnd" class="btn">Pad End</button>
      <div class="mt-2">
        <div>Pad Start Result: <strong>{{ padStartResult }}</strong></div>
        <div>Pad End Result: <strong>{{ padEndResult }}</strong></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
 

const box = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)

const randomColor1 = ref('#bdc3c7')
const randomColor2 = ref('#bdc3c7')

const utils = useUtils()

const randomize = () => {
  if (!utils) {
    console.log('utils not available')
    return
  }
  const color = utils.randomPick(['#e74c3c', '#3498db', '#2ecc71'])
  console.log('Random Color 1:', color)
  randomColor1.value = color
}

const randomize2 = () => {
  if (!utils) {
    console.log('utils not available')
    return
  }
  const color = utils.randomPick(['#9b59b6', '#1abc9c', '#f1c40f'])
  console.log('Random Color 2:', color)
  randomColor2.value = color
}

// Random Pick Demo
const randomPickResult = ref('')

const handleRandomPick = () => {
  if (!utils) return
  const options = ['Option 1', 'Option 2', 'Option 3']
  randomPickResult.value = utils.randomPick(options)
}

// Lerp Demo
const lerpStart = ref(0)
const lerpEnd = ref(100)
const lerpProgress = ref(0.5)
const lerpResult = ref(0)

const calculateLerp = () => {
  if (!utils) return
  lerpResult.value = utils.lerp(lerpStart.value, lerpEnd.value, lerpProgress.value)
}

// Clamp Demo
const clampValue = ref(50)
const clampMin = ref(0)
const clampMax = ref(100)
const clampResult = ref(0)

const calculateClamp = () => {
  if (!utils) return
  clampResult.value = utils.clamp(clampValue.value, clampMin.value, clampMax.value)
}

// Round & Round Pad Demo
const roundValue = ref(3.14159)
const roundPrecision = ref(2)
const roundResult = ref(0)
const roundPadResult = ref('')

const calculateRound = () => {
  if (!utils) return
  roundResult.value = utils.round(roundValue.value, roundPrecision.value)
}

const calculateRoundPad = () => {
  if (!utils) return
  roundPadResult.value = utils.roundPad(roundValue.value, roundPrecision.value)
}

// Shuffle Demo
const shuffleResult = ref(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'])

const shuffleList = () => {
  if (!utils) return
  shuffleResult.value = utils.shuffle(shuffleResult.value)
}

// Conversion Demo
const degInput = ref(180)
const radInput = ref(Math.PI)
const degToRadResult = ref(0)
const radToDegResult = ref(0)

const convertDegToRad = () => {
  if (!utils) return
  degToRadResult.value = utils.degToRad(degInput.value)
}

const convertRadToDeg = () => {
  if (!utils) return
  radToDegResult.value = utils.radToDeg(radInput.value)
}

// String Padding Demo
const padString = ref('Hello')
const padLength = ref(10)
const padChar = ref(' ')
const padStartResult = ref('')
const padEndResult = ref('')

const applyPadStart = () => {
  if (!utils) return
  padStartResult.value = utils.padStart(padString.value, padLength.value, padChar.value)
}

const applyPadEnd = () => {
  if (!utils) return
  padEndResult.value = utils.padEnd(padString.value, padLength.value, padChar.value)
}
</script>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.box {
  width: 80px;
  height: 80px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  user-select: none;
}

.btn {
  background-color: #2c3e50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #1a2733;
}

.input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  width: 80px;
  text-align: center;
}

.input-range {
  width: 150px;
}
</style>
