import { createApp } from 'vue';
import VuelidatePlugin from '@vuelidate/core';
import * as validators from '@vuelidate/validators';

export const app = createApp();

app.use(VuelidatePlugin, { validators });
