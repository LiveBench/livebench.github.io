export const bibtexEntry = `
@misc{livebench,
  author    = {White, Colin and Dooley, Samuel and Roberts, Manley and Feuer, Ben and Pal, Arka and Schwartz-Ziv, Ravid and Jain, Sid and Naidu, Siddartha and Hegde Chinmay, and LeCun, Yann and Goldstein, Tom and Neiswanger, Willie and Goldblum, Micah},
  title     = {LiveBench: A Framework for Future-Proof LLM Benchmarks},
  url   = {https://livecodebench.github.io/},
  year      = {2024},
}`;

export const abstract = `Test set contamination, wherein test data from a benchmark ends up in a newer model’s training set, is a well-documented obstacle for fair LLM evaluation and can quickly render benchmarks obsolete. As a consequence, LLM judging and benchmarks that crowdsource evaluations from their userbase and let human users judge the models’ responses are becoming popular. LLM judging and crowdsourced benchmarks have many benefits. However, they also introduce significant bias, and they break down when scoring the hardest questions: an LLM cannot score an answer correctly if it does not itself know the answer.`

export const tagline = `LiveBench is a continuously updated benchmark with questions based on brand new data.`