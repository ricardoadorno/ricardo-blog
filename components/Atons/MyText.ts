interface MyTextProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'small';
}

const VARIANT_MAP = {
  h1: 'text-5xl font-bold text-primary md:text-6xl',
  h2: 'text-4xl font-bold',
  h3: 'text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl',
  h4: 'text-2xl font-bold',
  h5: 'text-xl font-bold',
  p: 'text-xl',
  small: 'text-sm',
};

export default {
  props: {
    variant: { required: true, default: 'p' },
  },
  setup(props: MyTextProps, { slots }: any) {
    return () =>
      h(props.variant, { class: VARIANT_MAP[props.variant] }, slots.default());
  },
};
