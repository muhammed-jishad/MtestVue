<template>
  <div ref="app" id="app" class="app">
    <transition name="fade">
      <div class="load-overlay" v-if="!loaded"></div>
    </transition>
    <transition name="profile-view">
      <div key="2" class="app-container">
       
        <Header :menuWidth="menuWidth" />
        <div class="main-window">
          <Sidebar :currentView="currentView" :menuWidth="menuWidth" @update-view="updateView" />
          <UserData :currentView="currentView" />
          <Transactions :currentView="currentView" @new-event="onNewEvent" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from './HeaderSection.vue';
import Sidebar from './SideBar.vue';
import UserData from './UserData.vue';
import Transactions from './TransactionData.vue';

export default {
  components: {
    Header,
    Sidebar,
    UserData,
    Transactions
  },
  data() {
    return {
      eventDraftsMode: false,
      width: '500',
      eventModalHeight: 'auto',
      loaded: false,
      currentView: 'dashboard',
      wipEvent: null,
      menuWidth: 180
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.loaded = true;
    });
  },
  methods: {
    onNewEvent() {
      this.wipEvent = {};
      const _this = this;
      document.addEventListener('keyup', _this.handleCloseModal, true);
    },
    closeModal() {
      this.wipEvent = null;
      const _this = this;
      document.removeEventListener('keyup', _this.handleCloseModal, true);
    },
    newEventHandler(event) {
      if (event) {
        this.wipEvent = null;
      }
    },
    updateView(view) {
      this.currentView = view;
    }
  }
};
</script>




<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
:root {
  --primary-font: rgba(0,0,0,092);
  --primary-font-ii: rgba(0,0,0,0.75);
  --primary-font-iii: rgba(0,0,0,0.5);
  --primary-orange: hsl(204.1, 69.9%, 53.1%);
  --primary-orange_hover: hsl(204.1, 69.9%, 53.1%);
  --primary-orange_active: hsl(204.1, 69.9%, 53.1%);
  --bright-orange: hsl(248, 100%, 75%);
  --orange-active: hsla(248, 100%, 75% 0.1);
  --x-bright-orange: hsl(248, 100%, 80%);
  --primary-border-color: hsl(275, 3%, 80%);
  --dark-border: hsl(275, 4%, 85%);
  --x-dark-background: hsl(275, 3%, 87%);
  --x-dark-background_darken:hsl(275, 3%, 84%);
  --dark-background: hsl(275, 3%, 92%);
  --dark-background_hover: hsl(275, 4%, 95%);
  --medium-background: hsl(275, 4%, 95%);
  --light-background: hsl(275, 4%, 99%);
  --input-background: hsl(275, 3%, 100%);
  --blue: hsl(192, 100%, 52%);
}

h1, h2, h3, h4 {
  color: var(--primary-font);
}

.fui-subtitle {
  font-size: 0.8rem;
  color: var(--primary-font-iii);
  text-transform: uppercase;
  font-weight: 700;
}

.blocker {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  will-change: opacity;
}

.blocking {
  z-index: 11;
}

.blocker.dark {
  background: rgba(0, 0, 0, 0.55);
}

html, body {
  height: 100%;
  padding: 0;
  margin: 0;
  color: var(--primary-font);
  color: var();
  font-size: 10px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

* {
  box-sizing: border-box;
  font-family: "Poppins", cursive;
}




.no-events {
  text-align: center;
}

.no-events h1 {
  font-size: 4rem;
}

.no-events h3 {
  font-weight: 400;
  font-size: 1rem;
}

.app {
  height: 100%;
  width: 100%;
  background: var(--medium-background);
  overflow: hidden;
  z-index: 1;
}

.app-container {
  display: flex;
  flex-direction: column;
  background: var(--light-background);
  height: 100%;
  overflow: hidden;
  will-change: transform, opacity;
  z-index: 1 !important;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  overflow: auto;
  will-change: transform, opacity;
  background: var(--medium-background);
  z-index: 2 !important;
}

.header {
  display: flex;
  align-items: center;
  background: var(--dark-background);
  border-bottom: 1px solid var(--x-dark-background);
}

.header__brand {
  display: flex;
  align-items: center;
  align-self: stretch;
  position: relative;
  width: 200px;
  padding: 1em;
  border-right: 1px solid var(--x-dark-background);
  transition: background 0.15s ease;
  cursor: pointer;
}

.header__brand:hover {
  background: var(--x-dark-background);
}

.header__brand:active,
.header__brand.active {
  background: var(--x-dark-background_darken);
}

.header__dropdown {
  position: absolute;
  width: 200px;
  z-index: 100;
  top: calc(100% + 0.5em);
  left: 0.5em;
  background: var(--medium-background);
  border: 1px solid var(--x-dark-background);
  border-radius: 3px;
  box-shadow: 0 20px 24px rgba(0, 0, 0, 0.5);
}

.header__profile-img {
  border-radius: 50%;
  height: 36px;
  width: 36px;
  margin-right: 1em;
}

.header__profile-copy span {
  display: block;
}

.header__profile-copy span:last-child {
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.85;
}

.header__search {
  flex: 1;
}

.header__search .input, .header__search .input--big, .header__search .input--compact {
  flex: 1;
  cursor: pointer;
}

.header__tools {
  padding: 1em 2em;
  flex: 1;
  display: flex;
  align-items: center;
}

.header__tools__search {
  flex: 1;
  position: relative;
}

.header__tools__search.searching .input, .header__tools__search.searching .input--big, .header__tools__search.searching .input--compact {
  border-radius: 3px 3px 0 0;
}

.header__tools__search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  padding: 1em;
  background: var(--x-dark-background);
  border: 1px solid var(--dark-border);
  border-top: none;
  border-radius: 0 0 5px 5px;
  width: 100%;
  box-shadow: 0 10px 13px rgba(0, 0, 0, 0.2);
  will-change: opacity, transform;
  z-index: 11;
}

.header__tools__search-dropdown > span {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  font-weight: 700;
  color: var(--primary-font-iii);
  font-size: 0.85rem;
  text-transform: uppercase;
}

.header__tools__search-dropdown > span:after {
  flex: 1;
  content: "";
  position: relative;
  margin-left: 1em;
  background: rgba(255, 255, 255, 0.2);
  height: 1px;
}

.line-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-header:after {
  flex: 1;
  content: "";
  position: relative;
  margin-left: 1em;
  background: rgba(255, 255, 255, 0.5);
  height: 1px;
}
.header__brand-logo {
  background: rgba(255, 255, 255, 0.1) url("../../assets/Untitled.png") center center no-repeat;
  background-size: cover;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  min-width: 30px;
  margin-right: 0.5em;
}

.nav {
  flex-shrink: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: var(--medium-background);
  border-right: 1px solid var(--x-dark-background);
  padding: 0.5em;
}

.nav li svg {
  height: 18px;
  width: 18px;
  margin-right: 0.5em;
  fill: var(--primary-font);
  transition: opacity 0.15s ease;
  opacity: 0.7;
  will-change: opacity;
}

.nav li:not(.nyi):hover svg,
.nav li:not(.nyi):active svg,
.nav li:not(.nyi).active svg {
  opacity: 1;
}

.nav li {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.8em 1em;
  margin: 0;
  border-radius: 3px;
  user-select: none;
  transition: background 0.15s ease, color 0.15s ease;
  color: var(--primary-font);
}

.nav li:not(:first-child) {
  margin-top: 0.25em;
}

.nav li:not(.nyi):hover {
  background: var(--dark-background);
  color: var(--primary-font);
}

.nav li:active {
  background: var(--x-dark-background);
  color: var(--primary-font);
}

.nav li.active {
  background: var(--dark-background);
  color: var(--primary-font);
}

.nav li.nyi {
  cursor: not-allowed;
  opacity: 0.35;
}

.main-window {
  display: flex;
  overflow: hidden;
  flex: 1;
  align-items: stretch;
}

.app-window {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app-window__content-container {
  position: relative;
  display: flex;
  overflow-y: auto;
  flex: 1;
}

.app-window__content {
  position: relative;
  padding: 1em;
  flex: 3;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.no-search-results {
  text-align: center;
}

.no-search-results h1 {
  font-size: 4rem;
}

.no-search-results__meteor {
  font-size: 0.6rem;
  vertical-align: top;
}

.no-search-results h3 {
  font-weight: 400;
  font-size: 1rem;
}

.edit-pane {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 33%;
  border-right: 0;
  background: var(--medium-background);
  overflow: hidden;
  z-index: 1;
}

.edit-pane__resize {
  position: relative;
  height: 100%;
  width: 1px;
  background: var(--x-dark-background);
  cursor: col-resize;
  transition: background 0.15s var(--standard-motion), transform 0.15s var(--standard-motion);
  z-index: 10;
  user-select: none;
}

.edit-pane__resize:after {
  content: "";
  z-index: 1;
  display: block;
  height: 100%;
  width: 10px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

.edit-pane__resize:hover {
  transform: scaleX(2);
  background: var(--primary-orange);
}

.edit-pane__resize:active {
  transform: scaleX(2);
  background: var(--primary-orange_active);
}

.edit-pane__header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1em;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.75));
  border-bottom: 1px solid var(--x-dark-background);
}

.edit-pane__header-bg {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.edit-pane__content {
  overflow-y: auto;
  padding: 1em;
  padding-bottom: 80px;
}

.edit-pane__content .input, .edit-pane__content .input--big, .edit-pane__content .input--compact {
  padding: 1em;
}

.edit-pane__content .input-container:not(:last-of-type) {
  margin-bottom: 1em;
}

.edit-pane__header span {
  display: block;
}

.edit-pane__header-title,
.edit-pane__header-subtitle {
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.65);
}

.edit-pane__header svg {
  height: 20px;
  width: 20px;
  fill: rgba(255, 255, 255, 0.7);
  transition: fill 0.15s ease, background 0.15s ease;
  box-sizing: content-box;
  border-radius: 3px;
}

.edit-pane__header-close-icon {
  padding: 0.25em;
}

.edit-pane__header-locked-icon {
  margin-right: 1em;
}

.edit-pane__header-locked-tooltip-title {
  font-size: 1em;
  font-weight: 600;
  color: var(--primary-font);
}

.edit-pane__header-locked-tooltip-subtitle {
  color: var(--primary-font-iii);
  font-size: 0.9em;
}

.edit-pane__header-locked-icon svg {
  height: 30px;
  width: 30px;
  fill: rgba(255, 255, 255, 0.5);
}

.edit-pane__header-close-icon {
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}

.edit-pane__header-close-icon:hover {
  fill: white;
  background: rgba(255, 255, 255, 0.05);
}

.edit-pane__header-close-icon:active {
  fill: white;
  background: rgba(255, 255, 255, 0.1);
}

.input, .input--big, .input--compact {
  border: 1px solid var(--x-dark-background);
  background: var(--input-background);
  display: block;
  padding: 1em;
  border-radius: 3px;
  width: 100%;
  transition: border 0.15s ease;
  color: var(--primary-font);
  font-size: 0.9rem;
}




.input--compact {
  padding: 0.5em 1em;
}

div .key:not(:first-of-type) {
  margin-left: 0.5em;
}

.key {
  display: inline-flex;
  align-items: center;
}

.key__key {
  background: var(--x-dark-background);
  display: flex;
  align-items: center;
  padding: 0.65em;
  border-radius: 5px;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.5);
}

.key__key svg {
  height: 14px;
  width: 14px;
  fill: var(--primary-font);
}

.key__key:not(:first-of-type) {
  margin-left: 0.25em;
}

.key__help {
  display: block;
  margin-left: 0.75em;
  color: var(--primary-font-iii);
  font-size: 0.8rem;
}

.input--big {
  border-radius: 5px;
  padding: 1.5rem;
  border: 1px solid var(--light-background);
  background: var(--light-background);
  font-size: 1.1rem;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.15);
}

.input::placeholder,
.input--compact::placeholder,
.input--big::placeholder {
  color: --var(--primary-font-iii);
}

.input:hover, .input--compact:hover, .input--big:hover {
  border-color: var(--dark-border);
}

.input:focus, .input--compact:focus, .input--big:focus {
  border-color: var(--bright-orange);
  outline: 0;
}

.input img, .input--compact img, .input--big img {
  display: block;
  margin: 0 auto;
  max-width: 200px;
  width: 90%;
  min-height: 80px;
  border-radius: 3px;
}

.input_img-wrapper {
  display: block;
  margin: 0 auto;
}

.input_img {
  padding-bottom: 56.25%;
  display: block;
  margin: 0 auto;
  content: "";
  position: relative;
  border-radius: 3px;
}

.input.img, .img.input--compact, .img.input--big {
  cursor: pointer;
}

.input.img span, .img.input--compact span, .img.input--big span {
  display: block;
  text-align: center;
  color: var(--primary-font-iii);
  font-size: 12px;
  margin-top: 0.5em;
}

.input-container > span {
  display: block;
  margin-bottom: 0.5em;
  font-weight: 700;
  color: var(--primary-font-ii);
  font-size: 12px;
  text-transform: uppercase;
}

.input-container > span:nth-child(2) {
  font-weight: 500;
  text-transform: unset;
  font-size: 0.9em;
}

.modal-enter-active {
  transition: opacity 0.2s var(--enter-motion);
}

.modal-leave-active {
  transition: opacity 0.2s var(--leave-motion);
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal {
  transition: opacity 0.2s var(--enter-motion), transform 0.2s var(--enter-motion);
}

.modal-leave-active .modal {
  transition: opacity 0.2s var(--leave-motion), transform 0.2s var(--leave-motion);
}

.modal-enter .modal, .modal-leave-to .modal {
  opacity: 0;
  transform: scale(0.8) translate3d(0, 0, 0);
}

.edit-pane__save__changes li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-pane__save__changes li:not(:first-child) {
  margin-top: 0.25rem;
}

.edit-pane__save__changes--key {
  font-weight: 700;
  color: var(--primary-font-iii);
  font-size: 12px;
  text-transform: uppercase;
  transition: color 0.15s var(--standard-motion), text-shadow 0.15s var(--standard-motion);
  will-change: color, box-shadow;
}

.edit-pane__save__changes--vals {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  border: 1px solid var(--x-dark-background);
  background: var(--input-background);
  margin-left: 1em;
  padding: 5px 10px;
  border-radius: 3px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: border-color 0.15s var(--standard-motion), box-shadow 0.15s var(--standard-motion);
  will-change: border-color, box-shadow;
  line-height: 1.2;
}

.error .edit-pane__save__changes--key {
  color: #F04265;
  text-shadow: 0 0 10px rgba(240, 66, 101, 0.35);
}

.error .edit-pane__save__changes--vals {
  border-color: #ED254E;
  box-shadow: 0 0 5px rgba(240, 66, 101, 0.35);
}

.edit-pane__save__changes--vals svg {
  fill: var(--bright-orange);
  height: 14px;
  width: 14px;
  min-height: 14px;
  min-width: 14px;
  display: block;
  margin: 0 0.5em;
}

.edit-pane__save__changes--revert {
  fill: var(--bright-orange);
  height: 14px;
  width: 14px;
  min-height: 14px;
  min-width: 14px;
  padding: 0.15em;
  display: block;
  margin: 0;
  margin-left: 0.5em;
  cursor: pointer;
}

.edit-pane__save__changes--val {
  font-weight: 700;
  color: #f2f2f2;
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
  max-width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.edit-pane__save__changes--prev-val {
  font-weight: 700;
  color: #bfbfbf;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.edit-pane__save__changes ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding: 1em;
}

.edit-pane__shadow--buttom {
  position: absolute;
  pointer-events: none;
  z-index: 9;
  height: 60px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, var(--medium-background) 10%, transparent);
}

.edit-pane__buttons {
  display: flex;
  margin-left: 0.5em;
}

.edit-pane__buttons button:not(:last-child) {
  margin-right: 0.5em;
}

td .cell {
  display: flex;
  align-items: center;
}

td svg {
  height: 15px;
  width: 15px;
  fill: white;
  opacity: 0.7;
}

td.asc svg {
  transform: scale(0.6);
  opacity: 0.7;
}

td.sorting svg.up {
  transform: scale(1);
  opacity: 1;
}

td.sorting {
  color: var(--primary-font);
}

td.sorting svg.down {
  transform: scale(0.7);
  opacity: 0.7;
}

td.asc.sorting svg.down {
  transform: scale(1);
  opacity: 1;
}

td.asc.sorting svg.up {
  transform: scale(0.7);
  opacity: 0.7;
}

.icon-container {
  display: flex;
  flex-direction: column;
  margin-left: 0.5em;
}

button.primary {
  outline: 0;
  border: 0;
  display: inline-flex;
  align-items: center;
  background: var(--primary-orange);
  border-radius: 3px;
  padding: 0.7em;
  cursor: pointer;
  border: 1px solid transparent;
  will-change: background, opacity;
  transition: background 0.15s ease, opacity 0.15s ease;
}

button.primary:hover,
button.primary:focus {
  background: var(--primary-orange_hover);
}

button.primary:active {
  background: var(--primary-orange_active);
}

button.disabled {
  cursor: not-allowed !important;
  opacity: 0.66;
}

button.secondary {
  outline: 0;
  border: 0;
  display: inline-flex;
  align-items: center;
  background: var(--dark-background);
  border-radius: 3px;
  padding: 0.7em;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.15s ease;
}

button.small {
  outline: 0;
  border: 0;
  display: inline-flex;
  align-items: center;
  background: transparent;
  border-radius: 3px;
  padding: 0.45em;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.15s ease;
}

button.small {
  opacity: 0.7;
}

button.small.active {
  opacity: 1;
  transform: translateY(-1px);
  color: var(--primary-font);
  transition: 0.15s ease;
}

button span {
  color: var(--primary-font-iii);
  display: block;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

button.primary span {
  color: white;
}

button.secondary:hover,
button.secondary:focus {
  background: var(--x-dark-background);
  fill: white;
  border: 1px solid var(--dark-border);
}

button.secondary.delete:hover {
  background: rgba(238, 66, 102, 0.1);
  border: 1px solid #EE4266;
}

button.primary.delete {
  background: #ee4266;
}

button.primary.delete:hover,
button.primary.delete:focus {
  background: #c73857;
}

button.primary.delete:active {
  background: #b83350;
}

button.secondary:active,
button.secondary.active {
  background: var(--x-dark-background_darken);
  border: 1px solid var(--x-dark-background_darken);
}

button.secondary.delete:active {
  background: rgba(213, 49, 145, 0.2);
}

button.secondary:hover span,
button.small:hover span {
  color: var(--primary-font);
}

button.primary svg,
button.secondary svg {
  height: 20px;
  width: 20px;
  fill: var(--primary-font-ii);
  opacity: 0.75;
  transition: opacity 0.15s ease;
}

button.primary svg {
  fill: white;
}

button.small svg {
  height: 14px;
  width: 14px;
  fill: white;
  opacity: 0.75;
  transition: opacity 0.15s ease;
}

button.small:hover svg {
  opacity: 1;
}

button svg + span {
  margin-left: 0.5em;
}

button.secondary:hover svg,
button.secondary.active svg {
  opacity: 1;
}

.table-tools {
  display: flex;
  padding: 0 1em;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
  user-select: none;
}

.table-tools button:not(:first-child) {
  margin-left: 0.5em;
}

.table-tools .input-container {
  margin-bottom: 0;
}

.modal__container {
  position: fixed;
  display: flex;
  z-index: 100;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: opacity, transform;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  padding: 1em 0;
}

.modal {
  position: relative;
  display: flex;
  background: var(--medium-background);
  border-radius: 5px;
  box-shadow: 0 20px 23px rgba(0, 0, 0, 0.35);
  width: 90%;
  overflow: hidden;
  max-width: 500px;
  max-height: 100%;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transition: height 1s ease;
}

.modal--form {
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: height 0.5s ease;
  will-change: height;
}

.modal h1 {
  margin: 0;
}

.modal p {
  margin: 0;
  margin-top: 0.5em;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal__footer div:first-child:not(:last-child) {
  margin-right: auto;
}

.modal__footer button:not(:first-child) {
  margin-left: 0.5em;
}

.modal__header svg {
  height: 24px;
  width: 24px;
  fill: var(--primary-font-ii);
  margin-right: 0.5em;
}

.modal__header {
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 1.5em;
  padding-bottom: 0;
}

.modal__content {
  padding: 1.5em;
  overflow-y: auto;
  max-height: 300px;
  color: var(--primary-font-i);
}

.modal--event-modal .modal__content {
  overflow: hidden;
  max-height: unset;
  transition: height 0.35s ease;
}

.modal__content .input-container:not(:last-of-type) {
  margin-bottom: 1em;
}

.modal__media-uploader {
  padding: 2em;
  min-height: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 2px dashed var(--x-bright-orange);
}

.modal__media-uploader img {
  max-height: 100px;
  padding: 1em;
  margin-bottom: 1em;
  border: 1px solid var(--dark-border);
  box-sizing: content-box;
  background: var(--dark-background);
  border-radius: 3px;
}

.tags__add-button {
  position: relative;
  height: 20px;
  width: 20px;
  border: 2px solid var(--x-bright-orange);
  background: transparent;
  outline: 0;
  border-radius: 50%;
  fill: var(--x-bright-orange);
  padding: 0;
  transition: fill 0.15s ease, border 0.15s ease;
  cursor: pointer;
}

.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.tags__tag {
  display: inline-flex;
  border-radius: 15px;
  border: 2px solid var(--x-bright-orange);
  color: var(--x-bright-orange);
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 0.5em;
  padding: 0.25em 0.5em;
}

.tags__tag--minimal {
  border-radius: 15px;
  color: var(--x-bright-orange);
  font-size: 0.85rem;
  font-weight: 500;
  margin-right: 0.25em;
}

.tags__tag:last-of-type {
  margin-right: 1em;
}

.tags__add-button:hover {
  border: 2px solid var(--bright-orange);
  fill: var(--bright-orange);
}

.divider {
  display: block;
  height: 1px;
  width: calc(100% - 1em);
  position: relative;
  background: rgba(0, 0, 0, 0.35);
  margin: 0.5em auto;
}

.profile__content {
  display: flex;
  flex: 1;
  margin: 0 1em;
  flex-direction: column;
  position: relative;
  max-width: 700px;
}

.profile__close-button {
  position: sticky;
  top: 1em;
  margin-right: 1em;
}

.settings__section {
  display: flex;
  padding: 2em;
  background: var(--dark-background);
  border: 1px solid var(--dark-border);
  border-radius: 5px;
  margin-bottom: 1em;
}

.profile__width-container {
  display: flex;
  margin: 1em auto;
  width: 90%;
  max-width: 800px;
}

.snap-enter-active {
  transition: opacity 0.15s var(--enter-motion), transform 0.15s var(--enter-motion);
}

.snap-leave-active {
  transition: opacity 0.15s var(--leave-motion), transform 0.15s var(--leave-motion);
}

.snap-enter, .snap-leave-to {
  opacity: 0;
  transform: translate3d(0, -20px, 0);
}

.dropdown {
  position: fixed;
  z-index: 1;
  background: var(--x-dark-background);
  border: 1px solid var(--dark-border);
  border-radius: 3px;
  box-shadow: 0 20px 24px rgba(0, 0, 0, 0.5);
  text-align: left;
  backface-visibility: hidden;
  will-change: opacity, transform;
}

.dropdown__portal {
  z-index: 10000;
}

.dropdown-header {
  background: rgba(0, 0, 0, 0.25);
  padding: 1em 1.5em;
}

.dropdown-header input {
  width: 200px;
}

.dropdown-heading {
  margin: 0;
  white-space: nowrap;
}

.dropdown-content {
  overflow: hidden;
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5em;
}

.dropdown-content li svg {
  fill: rgba(255, 255, 255, 0.9);
  height: 20px;
  width: 20px;
}

.dropdown-content li svg:first-of-type {
  margin-right: 1em;
}

.dropdown-content li svg:nth-of-type(2) {
  margin-left: 1em;
}

.dropdown-content li svg.gold {
  fill: #E9B44C;
}

.dropdown-content li svg.blue {
  fill: #0ACDFF;
  transform: rotate(10deg);
}

.dropdown-content li svg.activated {
  fill: #5DFDCB;
}

.dropdown-item-content {
  flex: 1;
}

.dropdown-item-content span {
  display: block;
}

.dropdown-item-content span:last-child {
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.85;
}

.dropdown-content ul {
  padding: 0;
  margin: 0;
}

.dropdown-content li {
  display: flex;
  align-items: center;
  padding: 1em;
  border-radius: 3px;
  transition: background 0.15s ease, border 0.15s ease;
  will-change: background, border;
  border: 1px solid transparent;
  user-select: none;
  white-space: nowrap;
}

.dropdown-content li.active {
  border: 1px solid var(--bright-orange);
  background: var(--orange-active);
}

.dropdown-content li.hover {
  cursor: pointer;
}

.dropdown-content li.hover:not(.active):hover {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--dark-border);
}

.dropdown-content li.hover:not(.active):active {
  background: rgba(0, 0, 0, 0.4);
}

.dropdown-content li.hover.red:hover {
  background: rgba(238, 66, 102, 0.1);
  border: 1px solid #EE4266;
}

.dropdown-content li.hover.red:active {
  background: rgba(213, 49, 145, 0.2);
}

.dropdown-content li:not(:last-child) {
  margin-bottom: 0.5em;
}

.load-overlay {
  background: var(--medium-background);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 999;
}

.switch {
  padding: 2px;
  width: calc((var(--toggle-size) + 4px) * 2);
  background: var(--input-background);
  border: 1px solid var(--x-dark-background);
  border-radius: 20px;
  margin-right: 1em;
  will-change: background, border;
  transition: background 0.15s var(--standard-motion), border 0.15s var(--standard-motion);
  cursor: pointer;
}

.switch.toggled:hover .switch__toggle {
  background: var(--primary-orange_hover);
}

.switch:active .switch__toggle {
  background: black;
}

.switch.toggled:active .switch__toggle {
  background: var(--primary-orange_active);
}

.switch:hover {
  border: 1px solid var(--dark-border);
}

.switch.toggled {
  background: var(--x-dark-background);
}

.switch__toggle {
  display: block;
  height: var(--toggle-size);
  width: var(--toggle-size);
  background: var(--x-light-background);
  border-radius: 50%;
  will-change: transform, background, width;
  transition: transform 0.15s var(--standard-motion), background 0.15s var(--standard-motion), width 0.15s var(--standard-motion);
  transform: translate3d(0, 0, 0);
}

.toggled .switch__toggle {
  transform: translate3d(100%, 0, 0);
  background: var(--primary-orange);
}

.input--dropdown__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--dark-background);
  border: 1px solid var(--dark-border);
}

.search-result__search-away {
  display: block;
  text-align: center;
  opacity: 0.35;
  font-weight: 500;
}

.fancy-tooltip {
  position: relative;
}

.fancy-tooltip__trigger {
  position: relative;
}

.fancy-tooltip__tooltip {
  position: fixed;
  top: 0;
  left: 0;
  background: var(--dark-border);
  padding: 1em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  will-change: opacity, background;
  backface-visibility: hidden;
}

.fancy-tooltip__tooltip .fancy-tooltip__tooltip-cattot {
  height: 24px;
  width: 24px;
  fill: var(--dark-border);
  position: absolute;
  top: calc(0% - 10px);
  left: calc(50% - 12px);
  box-sizing: border-box;
  padding: 0;
}

.tooltip-enter-active, .tooltip-leave-active {
  transition: opacity 0.15s var(--enter-motion);
}

.tooltip-enter, .tooltip-leave-to {
  opacity: 0;
}
</style>
