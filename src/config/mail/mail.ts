interface IMailConfig {
  driver: 'ehtereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ehtereal',
  defaults: {
    from: {
      email: 'seuemail@seudomiio.cf',
      name: 'Seu nome',
    },
  },
} as IMailConfig;
