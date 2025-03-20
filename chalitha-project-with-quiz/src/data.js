export const questions = [
  {
    question: "Well done for getting started! What would you like us to call you?",
    options: [],
    validate: (value) => {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        return "Please enter only letters for your name";
      }
      return null;
    }
  },
  {
    question: "Select your gender?",
    options: ["Male", "Female", "Other"],
  },
  {
    question: "What is your age? (e.g., Ages between 17 - 32)",
    options: [],
    validate: (value) => {
      const age = parseInt(value);
      if (isNaN(age) || age < 17 || age > 32) {
        return "Please enter a valid age between 17 and 32";
      }
      return null;
    }
  },
  {
    question: "What year are you currently in at university?",
    options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  },
  {
    question: "On a typical day in weekdays, how many hours do you sleep? (e.g., 5 hours)",
    options: [],
    validate: (value) => {
      const hours = parseFloat(value);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        return "Please enter a valid number of hours between 0 and 24";
      }
      return null;
    }
  },
  {
    question: "On a typical day in weekends, how many hours do you sleep? (e.g., 5 hours)",
    options: [],
    validate: (value) => {
      const hours = parseFloat(value);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        return "Please enter a valid number of hours between 0 and 24";
      }
      return null;
    }
  },
  {
    question: "On a typical day in weekdays, how many hours do you spent on studying? (e.g., 5 hours)",
    options: [],
    validate: (value) => {
      const hours = parseFloat(value);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        return "Please enter a valid number of hours between 0 and 24";
      }
      return null;
    }
  },
  {
    question: "On a typical day in weekends, how many hours do you spent on studying? (e.g., 5 hours)",
    options: [],
    validate: (value) => {
      const hours = parseFloat(value);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        return "Please enter a valid number of hours between 0 and 24";
      }
      return null;
    }
  },
  {
    question: "On a typical day in weekdays, how many hours do you spend on screens for non-study activities? (e.g., on social media, gaming, TV)",
    options: [],
    validate: (value) => {
      const hours = parseFloat(value);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        return "Please enter a valid number of hours between 0 and 24";
      }
      return null;
    }
  },
  {
    question: "On a typical day in weekends, how many hours do you spend on screens for non-study activities? (e.g., on social media, gaming, TV)",
    options: [],
    validate: (value) => {
      const hours = parseFloat(value);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        return "Please enter a valid number of hours between 0 and 24";
      }
      return null;
    }
  },
  {
    question: "How many caffeinated drinks do you have per day? (coffee, tea, energy drinks)",
    options: ["0 (None)", "1 drink", "2 drinks", "3 drinks", "4 drinks", "5 drinks"],
  },
  {
    question: "How many minutes of vigorous physical activity do you do per day? (e.g., 20 minutes)",
    options: [],
    validate: (value) => {
      const minutes = parseInt(value);
      if (isNaN(minutes) || minutes < 0 || minutes > 1440) {
        return "Please enter a valid number of minutes between 0 and 1440";
      }
      return null;
    }
  },
  {
    question: "How would you rate your sleep quality on a scale of 1 to 10? (1 = Very poor, 10 = Excellent)",
    options: [],
    validate: (value) => {
      const rating = parseInt(value);
      if (isNaN(rating) || rating < 1 || rating > 10) {
        return "Please enter a rating between 1 and 10";
      }
      return null;
    }
  },
  {
    question: "On weekdays, what time do you usually go to sleep? (24-hour format, e.g., 23:00 for 11 PM)",
    options: [],
    validate: (value) => {
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
        return "Please enter time in 24-hour format (e.g., 23:00)";
      }
      return null;
    }
  },
  {
    question: "On weekdays, what time do you usually wake up? (24-hour format, e.g., 07:00 for 7 AM)",
    options: [],
    validate: (value) => {
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
        return "Please enter time in 24-hour format (e.g., 07:00)";
      }
      return null;
    }
  },
  {
    question: "On weekends, what time do you usually go to sleep? (24-hour format, e.g., 00:30 for 12:30 AM)",
    options: [],
    validate: (value) => {
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
        return "Please enter time in 24-hour format (e.g., 00:30)";
      }
      return null;
    }
  },
  {
    question: "On weekends, what time do you usually wake up? (24-hour format, e.g., 09:30 for 9:30 AM)",
    options: [],
    validate: (value) => {
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
        return "Please enter time in 24-hour format (e.g., 09:30)";
      }
      return null;
    }
  },
];