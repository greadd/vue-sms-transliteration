<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-4 rounded-lg">
          <v-toolbar color="success white--text" flat>
            <v-toolbar-title class="ml-2">SMS </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-textarea
                v-model="message"
                solo
                class="rounded-lg"
                auto-grow
                label="Enter your message..."
                type="text"
                :counter="0"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-checkbox
              label="Transliterate"
              v-model="checkbox"
              color="success"
              @change="transliterateMessage"
            ></v-checkbox>
            <p>Number of messages: {{ numberOfMessages }}</p>
            <v-btn
              color="success"
              width="250"
              class="rounded-lg mr-2 mb-2"
              @click="saveMessage"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data: () => ({
    message: '',
    checkbox: false
  }),
  computed: {
    numberOfMessages: function () {
      const msg = this.message;
      if (msg.length) {
        let numberOfMessages = 1;
        let maxMessageLength = 160;
        if (/[а-яА-Я]/g.test(msg)) {
          maxMessageLength = 70;
          if (msg.length > maxMessageLength) {
            maxMessageLength = 67;
            numberOfMessages = Math.ceil(msg.length / maxMessageLength);
          }
        } else if (msg.length > maxMessageLength) {
          maxMessageLength - 153;
          numberOfMessages = Math.ceil(msg.length / maxMessageLength);
        }
        return numberOfMessages;
      } else return 0;
    }
  },
  methods: {
    async saveMessage() {
      if (this.message.trim()) {
        try {
          await axios.post('http://localhost:3000/messages', {
            message: this.message,
            numberOfMessages: this.numberOfMessages
          });
          this.$store.dispatch('setSnackbar', {
            text: 'Saved!',
            color: 'success'
          });
          this.message = '';
        } catch (error) {
          console.log(error);
        }
      }
    },
    transliterateMessage() {
      if (this.checkbox) {
        this.message = this.message
          .replace(/\u0401/g, 'Yo')
          .replace(/«/g, '"')
          .replace(/»/g, '"')
          .replace(/–/g, '-')
          .replace(/—/g, '-')
          .replace(/`/g, "'")
          .replace(/—/g, '-')
          .replace(/\u0419/g, 'Y')
          .replace(/\u0426/g, 'Ts')
          .replace(/\u0423/g, 'U')
          .replace(/\u041A/g, 'K')
          .replace(/\u0415/g, 'E')
          .replace(/\u041D/g, 'N')
          .replace(/\u0413/g, 'G')
          .replace(/\u0428/g, 'Sh')
          .replace(/\u0429/g, 'Sch')
          .replace(/\u0417/g, 'Z')
          .replace(/\u0425/g, 'H')
          .replace(/\u042A/g, "'")
          .replace(/\u0451/g, 'yo')
          .replace(/\u0439/g, 'y')
          .replace(/\u0446/g, 'ts')
          .replace(/\u0443/g, 'u')
          .replace(/\u043A/g, 'k')
          .replace(/\u0435/g, 'e')
          .replace(/\u043D/g, 'n')
          .replace(/\u0433/g, 'g')
          .replace(/\u0448/g, 'sh')
          .replace(/\u0449/g, 'sch')
          .replace(/\u0437/g, 'z')
          .replace(/\u0445/g, 'h')
          .replace(/\u044A/g, "'")
          .replace(/\u0424/g, 'F')
          .replace(/\u042B/g, 'I')
          .replace(/\u0412/g, 'V')
          .replace(/\u0410/g, 'A')
          .replace(/\u041F/g, 'P')
          .replace(/\u0420/g, 'R')
          .replace(/\u041E/g, 'O')
          .replace(/\u041B/g, 'L')
          .replace(/\u0414/g, 'D')
          .replace(/\u0416/g, 'Zh')
          .replace(/\u042D/g, 'E')
          .replace(/\u0444/g, 'f')
          .replace(/\u044B/g, 'i')
          .replace(/\u0432/g, 'v')
          .replace(/\u0430/g, 'a')
          .replace(/\u043F/g, 'p')
          .replace(/\u0440/g, 'r')
          .replace(/\u043E/g, 'o')
          .replace(/\u043B/g, 'l')
          .replace(/\u0434/g, 'd')
          .replace(/\u0436/g, 'zh')
          .replace(/\u044D/g, 'e')
          .replace(/\u042F/g, 'Ya')
          .replace(/\u0427/g, 'Ch')
          .replace(/\u0421/g, 'S')
          .replace(/\u041C/g, 'M')
          .replace(/\u0418/g, 'I')
          .replace(/\u0422/g, 'T')
          .replace(/\u042C/g, "'")
          .replace(/\u0411/g, 'B')
          .replace(/\u042E/g, 'U')
          .replace(/\u044F/g, 'ya')
          .replace(/\u0447/g, 'ch')
          .replace(/\u0441/g, 's')
          .replace(/\u043C/g, 'm')
          .replace(/\u0438/g, 'i')
          .replace(/\u0442/g, 't')
          .replace(/\u044C/g, "'")
          .replace(/\u0431/g, 'b')
          .replace(/\u044E/g, 'u');
      } else
        this.message = this.message
          .replace(/sch/g, 'щ')
          .replace(/Sch/g, 'Щ')
          .replace(/Sh/g, 'Ш')
          .replace(/sh/g, 'ш')
          .replace(/zh/g, 'ж')
          .replace(/Yo/g, 'Ё')
          .replace(/Ts/g, 'Ц')
          .replace(/Sh/g, 'Ш')
          .replace(/Zh/g, 'Ж')
          .replace(/yo/g, 'ё')
          .replace(/ts/g, 'ц')
          .replace(/Ya/g, 'Я')
          .replace(/Ch/g, 'Ч')
          .replace(/ya/g, 'я')
          .replace(/ch/g, 'ч')
          .replace(/\u0027/g, 'ь')
          .replace(/"/, '«')
          .replace(/"/, '»')
          .replace(/-/g, '–')
          .replace(/-/g, '—')
          .replace(/'/g, '`')
          .replace(/-/g, '—')
          .replace(/\u0027/g, 'Ь')
          .replace(/\u0059/g, 'Й')
          .replace(/\u0055/g, 'У')
          .replace(/\u004B/g, 'К')
          .replace(/\u0045/g, 'Е')
          .replace(/\u004E/g, 'Н')
          .replace(/\u0047/g, 'Г')
          .replace(/\u005A/g, 'З')
          .replace(/\u0048/g, 'Х')
          .replace(/\u0075/g, 'у')
          .replace(/\u006B/g, 'к')
          .replace(/\u0065/g, 'е')
          .replace(/\u006E/g, 'н')
          .replace(/\u0067/g, 'г')
          .replace(/\u007A/g, 'з')
          .replace(/\u0046/g, 'Ф')
          .replace(/\u0056/g, 'В')
          .replace(/\u0041/g, 'А')
          .replace(/\u0050/g, 'П')
          .replace(/\u0052/g, 'Р')
          .replace(/\u004F/g, 'О')
          .replace(/\u004C/g, 'Л')
          .replace(/\u0044/g, 'Д')
          .replace(/\u0066/g, 'ф')
          .replace(/\u0076/g, 'в')
          .replace(/\u0061/g, 'а')
          .replace(/\u0070/g, 'п')
          .replace(/\u0072/g, 'р')
          .replace(/\u006F/g, 'о')
          .replace(/\u006C/g, 'л')
          .replace(/\u0064/g, 'д')
          .replace(/\u0053/g, 'С')
          .replace(/\u004D/g, 'М')
          .replace(/\u0049/g, 'И')
          .replace(/\u0054/g, 'Т')
          .replace(/\u0042/g, 'Б')
          .replace(/\u0068/g, 'х')
          .replace(/\u006D/g, 'м')
          .replace(/\u0069/g, 'и')
          .replace(/\u0074/g, 'т')
          .replace(/\u0027/g, 'ъ')
          .replace(/\u0027/g, 'Ъ')
          .replace(/\u0069/g, 'ы')
          .replace(/\u0045/g, 'Э')
          .replace(/\u0065/g, 'э')
          .replace(/\u0055/g, 'Ю')
          .replace(/\u0049/g, 'Ы')
          .replace(/\u0062/g, 'б')
          .replace(/\u0075/g, 'ю')
          .replace(/\u0079/g, 'й')
          .replace(/\u0073/g, 'с');
    }
  }
};
</script>
