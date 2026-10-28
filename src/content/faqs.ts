export type Faq = { question: string; answer: string }

export const generalFaqs: Faq[] = [
  {
    question: "What exactly does Pan Axis do?",
    answer:
      "We redesign factory floors. We measure how work really moves through your factory, design better layouts, test them in a computer model, and help you move in phases. Think of us as doctors for factories.",
  },
  {
    question: "Do you sell machines or equipment?",
    answer:
      "No. We don't sell machines and we take no commission on equipment. We help you get more from the ones you already have.",
  },
  {
    question: "Will we have to stop production?",
    answer:
      "No. Measurements happen while you work, and moves are planned in phases — usually over weekends — so production keeps running.",
  },
  {
    question: "How do we know the new layout will work?",
    answer:
      "Every option is tested in a computer model of your factory before anything moves. The model is first checked against your real output, so you see the expected result in numbers.",
  },
  {
    question: "How long does a redesign take?",
    answer:
      "A typical engagement runs four sessions over four to eight weeks, followed by the move and a re-measurement 4–8 weeks later. Smaller floors can be faster.",
  },
  {
    question: "Is our factory too small?",
    answer:
      "If products travel, wait, or double back on your floor, layout matters. We work with workshops of a handful of machines as well as large plants.",
  },
  {
    question: "Is our data kept confidential?",
    answer:
      "Yes. Measurements, drawings and models belong to you. We are happy to sign an NDA before the first visit.",
  },
]

export const pricingFaqs: Faq[] = [
  {
    question: "Why don't you publish fixed prices?",
    answer:
      "Every floor is different. After the free FloorCheck we know the size of the job and send a fixed quote — no hourly surprises.",
  },
  {
    question: "Can we start with just one session?",
    answer:
      "Yes. Many clients begin with Session A (Get the facts right) and decide on the redesign once they see the measured picture.",
  },
  {
    question: "What if the layout isn't the problem?",
    answer: "Then we tell you during the FloorCheck — before you spend anything — and point you to what is.",
  },
]
