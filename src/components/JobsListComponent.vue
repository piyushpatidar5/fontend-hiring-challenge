<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <el-row :gutter="0">
            <el-col :key="index" v-for="(course,index) in courses" class="widthAuto" :span="24">
              <div class="grid-content borderDiv">
                <el-row :key="name" v-for="(job,name) in jobsAttributes" :gutter="0">
                  <el-col v-if="course[job]!=''" :span="24">
                    <div class="grid-content">{{name}}: {{course[job]}}</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { _ } from "vue-underscore";
export default {
  name: "JobsListComponent",
  data() {
    return {
      ProviderSearch: "",
      jobsAttributes: {
        Jobtitle: "title",
        Company: "companyname",
        Location: "location",
        Salary: "salary",
        Type: "jd",
        "Start date": "startdate",
        "End date": "enddate",
        "Apply link": "applylink",
        Source: "source"
      }
    };
  },
  components: {},
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "spinner-border",
      background: "#fff"
    });
    this.$store.dispatch("loadjobsData").then(
      response => {
        if (response) loading.close();
      },
      error => {
        loading.close(error);
      }
    );
  },
  methods: {},
  computed: {
    courses() {
      return this.$store.state.jobsData;
    },
    parsedCourses: {
      // getter
      get: function() {
        return this.$store.state.parsedCourses;
      },
      // setter
      set: function(newValue) {
        this.$store.state.parsedCourses = newValue;
      }
    }
  }
};
</script>

<style>
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: loading-rotate 1s linear infinite;
}

.widthAuto {
  width: auto !important;
}
.borderDiv {
  border: 1px solid black;
  height: 170px;
  width: 320px;
  margin: 10px;
  padding: 5px;
  font-size: 12px !important;
}
</style>