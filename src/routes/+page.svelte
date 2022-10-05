<script lang="ts">
  import { onMount } from 'svelte';
  import { resumeJSONToData } from '../data/data';
  import { mockResume } from '../data/mockResume';
  import Menu from '../components/menu.svelte';
  import Resume from '../components/resume.svelte';

  // TODO: need to figure out how to import mockResume json from another file
  // const mockResume = `{
  //   "basic_information": {
  //     "name": "Nicholas Patti",
  //     "title": "Frontend Engineer",
  //     "contact": "+19253897100",
  //     "email": "nickspatties@gmail.com",
  //     "location": "Colorado, USA"
  //   },
  //   "experience": [
  //     {
  //       "company": "Self employed",
  //       "title": "Development lead",
  //       "start_date": "2021-10-1",
  //       "end_date": "2022-10-01",
  //       "highlights": [
  //         "Made a couple apps",
  //         "Published app on the app store",
  //         "Designed, planned, and developed the app",
  //         "Took feedback and implemented it to improved features"
  //       ]
  //     },
  //     {
  //       "company": "Amazon Fulfillment Technologies, Amazon.com Inc",
  //       "title": "Software Engineer",
  //       "start_date": "2016-06-01",
  //       "end_date": "2019-08-01",
  //       "highlights": [
  //         "CDesigned and wrote a production-ready, multi-platform, frontend framework using ReactJS and CSS that currently supports five separate fulfillment businesses worldwide",
  //         "Designed, implemented, and released multiple associate-facing process workflows based on UI mockups and feedback from stakeholders",
  //         "Promptly addressed customer feedback of components to improve their experience, including word-based truncation, progress bar completion rate, manager-to-associate messaging, content-aware notifications, and more",
  //         "Created a process to test any changes to components or associate workflows directly on the expected hand-scanner devices within a secure, corporate network",
  //         "Removed cross site request forgery threats from associate-facing website. Increased the speed of completion by four times by creating a tool to find vulnerable forms",
  //         "Removed end-of-life build software by designing and implementing a new build system, which simultaneously permitted package owners to more simply upgrade other dependent packages",
  //         "Collaborated with UX Designers to create Fulfillment Human Interactive Guidelines, coaching SDEs the best ways to craft excellent customer experiences for fulfillment associates"
  //       ]
  //     },
  //     {
  //       "company": "Oomba. Inc",
  //       "title": "Software Engineer and Founder",
  //       "start_date": "2014-11-1",
  //       "end_date":"2016-3-1",
  //       "highlights": [
  //         "Developed a robust tournament management system with software engineers and UX designers",
  //         "Developed software that was used to manage major tournaments, including a National Championship for Legendary, a deck building game",
  //         "Improved the ease of development and site performance by replacing previous JS implementation with AngularJS. Translated the paths for tournament, event, and game creation to Angular",
  //         "Implementing drag and drop player assignments in our tournament management tool, improving user experience for tournament organizers",
  //         "Utilized Pusher Javascript Client to implement live, updating leaderboard, match assignments, email notifications, and more"
  //       ]
  //     }
  //   ],
  //   "education" : [
  //     {
  //       "degree": "Master of Science",
  //       "instituiton": "University of California, Santa Cruz",
  //       "startDate": "",
  //       "endDate": "",
  //       "highlights": [
  //         "Games and Playable Media – Department of Computer Science, Baskin School of Engineering",
  //         "Cumulative GPA: 3.6"
  //       ]
  //     },
  //     {
  //       "degree": "Bachelor of Science",
  //       "instituiton": "University of California, Santa Cruz",
  //       "startDate": "",
  //       "endDate": "",
  //       "highlights": [
  //         "Computer Game Design – Department of Computer Science, Baskin School of Engineering",
  //         "Graduated with Honors"
  //       ]
  //     }
  //   ]
  // }`

  let realData = resumeJSONToData(mockResume);

  onMount(() => {
    // TODO load real data from memory
  });
</script>

<Menu resume={realData} />
<Resume resume={realData} />
