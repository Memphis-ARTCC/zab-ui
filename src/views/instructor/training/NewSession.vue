<template>
    <div class="card">
      <div class="card-content">
        <span class="card-title"> Enter Session Details</span>
        <div class="session_notes">
          <form>
            <div class="row row_no_margin">
              <div class="input-field col s12 m6">
                <select v-model="form.studentCid" required class="materialize-select">
                  <option value="" disabled selected>Select a controller</option>
                  <option v-for="controller in controllers" :value="controller.cid" :key="controller.cid">{{ controller.fname }} {{ controller.lname }} - {{ controller.cid }}</option>
                </select>
                <label>Controller</label>
              </div>
            </div>
            <div class="row row_no_margin">
              <div class="input-field col s12 m6">
                <input id="start_time" type="text" class="datepicker" ref="startTime" required>
                <label for="start_time" class="active">Start Time (Zulu)</label>
              </div>
              <div class="input-field col s12 m6">
                <input id="end_time" type="text" class="datepicker" ref="endTime" required>
                <label for="end_time" class="active">End Time (Zulu)</label>
              </div>
            </div>
            <div class="row row_no_margin">
              <div class="input-field col s12 m6">
                <select v-model="form.milestone" required class="materialize-select">
                  <option value="" disabled selected>Select a milestone</option>
                  <option v-for="milestone in milestones" :value="milestone.code" :key="milestone.code">{{ milestone.name }}</option>
                </select>
                <label>Milestone</label>
              </div>
              <div class="input-field col s12 m6">
                <input
                  id="position"
                  type="text"
                  required
                  v-model="form.position"
                />
                <label for="position" class="active">Position</label>
              </div>
            </div>
            <div class="row row_no_margin">
              <div class="input-field col s12 m6">
                <input
                  id="movements"
                  type="number"
                  min="0"
                  max="500"
                  required
                  v-model="form.movements"
                />
                <label for="movements" class="active">Movements</label>
              </div>
              <div class="input-field col s12 m6">
                <select required v-model="form.ots" class="materialize-select">
                  <option value="" disabled selected>Select an option</option>
                  <option value="0">No OTS</option>
                  <option value="1">OTS Pass</option>
                  <option value="2">OTS Fail</option>
                  <option value="3">OTS Recommended</option>
                </select>
                <label>OTS</label>
              </div>
            </div>
            <div class="row row_no_margin">
              <div class="input-field col s12 m6">
                <select
                  required
                  v-model="form.location"
                  class="materialize-select"
                >
                  <option value="" disabled selected>Select a location</option>
                  <option value="0">Classroom</option>
                  <option value="1">Live Network</option>
                  <option value="2">Sweatbox</option>
                </select>
                <label>Location</label>
              </div>
              <div class="input-field col s12 m6">
                <select
                  required
                  v-model="form.progress"
                  class="materialize-select"
                >
                  <option value="" disabled selected>Select an option</option>
                  <option value="1">No Progress</option>
                  <option value="2">Little Progress</option>
                  <option value="3">Average Progress</option>
                  <option value="4">Great Progress</option>
                  <option value="5">Exceptional Progress</option>
                </select>
                <label>Progress</label>
              </div>
            </div>
            <div class="row row_no_margin">
              <div class="input-field col s12">
                <textarea
                  id="studentNotes"
                  class="materialize-textarea"
                  data-length="3000"
                  v-model="form.studentNotes"
                ></textarea>
                <label for="studentNotes" class="active"
                  >Student Notes
                  <i
                    class="material-icons tooltipped"
                    data-position="right"
                    data-tooltip="Notes visible to the student"
                    >help</i
                  ></label
                >
              </div>
              <div class="input-field col s12">
                <textarea
                  id="insNotes"
                  class="materialize-textarea"
                  data-length="3000"
                  v-model="form.insNotes"
                ></textarea>
                <label for="insNotes" class="active"
                  >Instructor Notes
                  <i
                    class="material-icons tooltipped"
                    data-position="right"
                    data-tooltip="Notes visible to training staff only"
                    >help</i
                  ></label
                >
              </div>
            </div>
            <div class="row row_no_margin">
              <div class="input-field col s12 submit_buttons">
                <button
                  type="button"
                  class="btn right"
                  @click="SubmitTraining"
                >
                  Submit Training
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { zabApi } from "@/helpers/axios.js";
  import { mapState } from 'vuex';
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';
  export default {
    name: "SessionNotes",
    title: "Enter Session Details",
    data() {
      return {
        controllers: null,
        milestones: null,
        form: {
          cid: '',
          position: '',
          movements: '',
          progress: '',
          milestone: '',
          ots: '',
          location: '',
          studentNotes: '',
          insNotes: ''
        }
      };
    },
    computed: {
      ...mapState("user", ["user"]),
    },
    async mounted() {
      await this.getControllers();
      await this.getMilestones();

      flatpickr(this.$refs.startTime, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
      });

      flatpickr(this.$refs.endTime, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
      });

      M.FormSelect.init(document.querySelectorAll('.materialize-select'), {});
    },
    methods: {
      async getControllers() {
        const { data } = await zabApi.get('/feedback/controllers');
        this.controllers = data.data
      },
      async getMilestones() {
        const { data } = await zabApi.get('/training/milestones');
        this.milestones = data.data.milestones;
      },
      async SubmitTraining() {
        try {
          const { data } = await zabApi.post('/training/session/new/', {
              studentCid: this.form.studentCid,
              position: this.form.position,
              movements: this.form.movements,
              progress: this.form.progress,
              milestone: this.form.milestone,
              ots: this.form.progress,
              location: this.form.location,
              startTime: this.$refs.startTime.value,
              endTime: this.$refs.endTime.value,
              studentNotes: this.form.studentNotes,
              insNotes: this.form.insNotes,
            });
          if (data.ret_det.code === 200) {
            this.toastSuccess("Session submitted");
            this.$router.push("/ins/training/sessions");
          } else this.toastError(data.ret_det.message);
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
  </script>

  <style scoped lang="scss">
  label {
    .material-icons {
      font-size: 17px;
      display: inline-flex;
      vertical-align: top;
      margin-top: 0.25em;
      user-select: none;
      cursor: pointer;
    }
  }

  .submit_buttons {
    input {
      margin-left: 0.5em;
    }
  }
  </style>