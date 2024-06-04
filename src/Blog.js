import React from 'react';
import './Blog.css';
import 'bulma/css/bulma.css'
import { bibtexEntry, tagline } from './constants';
import livebench_chatbot_bar from './images/scaled_livebench_chatbot.png';
import livebench_chatbot_scatter from './images/scatter_livebench_chatbot.png';


function Blog() {
    return (
        <div className="Blog">
            <section class="hero">
                <div class="hero-body">
                    <div class="container is-max-desktop">
                        <div class="columns is-centered">
                            <div class="column has-text-centered">
                                <h1 class="title is-1 publication-title">LiveBench: A Framework for Future-Proof LLM Benchmarks</h1>
                                <div class="is-size-5 publication-authors">
                                    <span class="author-block">
                                        <a href="https://crwhite.ml" target="_blank" rel="noreferrer">Colin White*</a><sup>1</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="http://spamueldooley.com" target="_blank" rel="noreferrer">Samuel Dooley*</a><sup>1</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Manley Roberts*</a><sup>1</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Arka Pal*</a><sup>1</sup>,
                                    </span>
                                    <br></br>
                                    <span class="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Ben Feuer</a><sup>2</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="https://tmfs10.github.io/" target="_blank" rel="noreferrer">Siddhartha Jain</a><sup>3</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="https://www.ravid-shwartz-ziv.com" target="_blank" rel="noreferrer">Ravid Shwartz-Ziv</a><sup>2</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="https://neelsjain.github.io/" target="_blank" rel="noreferrer">Neel Jain</a><sup>4</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="https://khalidsaifullaah.github.io/" target="_blank" rel="noreferrer">Khalid Saifullah</a><sup>4</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Siddartha Naidu</a><sup>1</sup>,
                                    </span>
                                    <br></br>
                                    <span class="author-block">
                                        <a href="https://chinmayhegde.github.io">Chinmay Hegde</a><sup>2</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="http://yann.lecun.com">Yann LeCun</a><sup>2,5</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="https://www.cs.umd.edu/~tomg/">Tom Goldstein</a><sup>4</sup>
                                    </span>
                                    <span class="author-block">
                                        <a href="https://willieneis.github.io" target="_blank" rel="noreferrer">Willie Neiswanger</a><sup>6</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="https://goldblum.github.io">Micah Goldblum</a><sup>2</sup>
                                    </span>
                                </div>

                                <div class="is-size-5 publication-authors">
                                    <span class="author-block"><sup>1</sup>Abacus.AI,</span>
                                    <span class="author-block"><sup>2</sup>NYU,</span>
                                    <span class="author-block"><sup>3</sup>Nvidia,</span>
                                    <span class="author-block"><sup>4</sup>UMD,</span>
                                    <span class="author-block"><sup>5</sup>Meta,</span>
                                    <span class="author-block"><sup>6</sup>USC</span>
                                </div>

                                <div class="column has-text-centered">
                                    <div class="publication-links">
                                        <span class="link-block">
                                            <a href="./"
                                                class="external-link button is-normal is-rounded is-dark">
                                                <span class="icon">
                                                    <i class="fa-solid fa-medal"></i>
                                                </span>
                                                <span>Leaderboard</span>
                                            </a>
                                            <a href="./#/blog"
                                                class="external-link button is-normal is-rounded is-dark">
                                                <span class="icon">
                                                    <i class="fa-regular fa-newspaper"></i>
                                                </span>
                                                <span>Blog</span>
                                            </a>
                                        </span>
                                        <span class="link-block">
                                            <a href="./"
                                                class="external-link button is-normal is-rounded is-dark">
                                                <span class="icon">
                                                    <i class="fa-brands fa-github"></i>
                                                </span>
                                                <span>Code</span>
                                            </a>
                                        </span>
                                        <span class="link-block">
                                            <a href="./"
                                                class="external-link button is-normal is-rounded is-dark">
                                                <span class="icon">
                                                    <i class="fa-solid fa-database"></i>
                                                </span>
                                                <span>Data</span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="hero teaser">
                <div class="container is-max-desktop">
                    <div class="hero-body">
                        <h2 class="subtitle has-text-centered">
                            {tagline}
                        </h2>
                        <div className="has-text-centered">
                            <img src="livebench_radar.png" alt="Radial Plot Visualization" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container is-max-desktop">
                    <div class="columns is-centered has-text-centered">
                        <div class="column is-four-fifths">
                            <h2 class="title is-3">Introduction</h2>
                            <div class="content has-text-justified">
                                Test set contamination, wherein test data from a benchmark ends up in a newer model’s training set, is a well-documented obstacle for fair LLM evaluation and can quickly render benchmarks obsolete. As a consequence, benchmarks that use LLMs-as-a-judge, or that crowdsource prompts and evaluations from human judges are gaining in popularity.  While LLM judging and crowdsourced benchmarks have many benefits, they also introduce significant biases, and they break down when scoring hard questions; for example, it is difficult for an LLM (or human) to correctly grade answers to questions that it itself cannot solve.
                                <br /><br />
                                We introduce a new framework for benchmarking LLMs designed to be immune to both test set contamination and the pitfalls of LLM judging and human crowdsourcing. We use this framework to create LiveBench, the first benchmark with the following properties.
                                <ul>
                                    <li>
                                        Contains frequently-updated questions from new information sources, in which <strong>questions become harder over time</strong>.
                                    </li>
                                    <li>
                                        Scores answers automatically according to objective ground-truth values, without the use of LLM judges.
                                    </li>
                                    <li>
                                        Contains a wide variety of challenging tasks, spanning math, coding, reasoning, writing, instruction following, and data analysis.
                                    </li>
                                </ul>
                                To achieve this, LiveBench contains questions that are based on recently-released math competitions, arXiv papers, and datasets, and it contains harder, 'contamination-proof' versions of previously released benchmarks: Big-Bench Hard, AMPS, and IFEval. We evaluate several prominent closed-source models, as well as dozens of open-source models ranging from 7B to 70B in size, on our benchmark. LiveBench is hard, with GPT-4-Turbo only achieving 45% accuracy. We release all questions, code, and model answers. Questions will be added and updated on a monthly basis, and we welcome community engagement and collaboration for expanding the benchmark tasks and models.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div class="container is-max-desktop">
                    <div class="columns is-centered has-text-centered">
                        <div class="column is-four-fifths">
                            <h2 class="title is-3">Benchmark Overview</h2>
                            <div class="content has-text-justified">
                                LiveBench contains the following categories of questions.
                                <ul>
                                    <li>
                                        Coding: code generation and code completion problems from recent sites such as Leetcode.
                                    </li>
                                    <li>
                                        Math: recent high school math competitions such as AMC12 and AIME, a harder, new version of AMPS dataset, and a proof completion task for USAMO and IMO problems.
                                    </li>
                                    <li>
                                        Reasoning: harder, new versions of tasks from Big-Bench Hard and bAbi, as well as zebra puzzles.
                                    </li>
                                    <li>
                                        Data Analysis: questions using recent datasets on Kaggle: table reformatting, predicting which columns can join two tables, and column type annotation
                                    </li>
                                    <li>
                                        Text Comprehension: Connections puzzles, and answering questions about recent arxiv papers.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div class="container is-max-desktop">
                    <div class="columns is-centered has-text-centered">
                        <div class="column is-four-fifths">
                            <h2 class="title is-3">Motivation</h2>
                            <div class="content has-text-justified">
                                Most modern LLMs include large swaths of the internet in their training data; if the LLM has seen the questions of a benchmark during training, its performance on that benchmark will be artificially inflated. For example, recent work shows that LLMs' performance on Codeforces plummets after the training data cutoff date of the LLM, and before the cutoff date, performance is highly correlated with the number of times the problem appears on GitHub. Similarly, a recent hand-crafted variant of the established math dataset, GSM8K, shows evidence that several models have overfitted to this benchmark.
                                <br></br><br></br>

                                <strong>LLM-as-a-judge. </strong>
                                LLM judging is fast and relatively cheap. Furthermore, its biggest strength is its ability to judge open-ended questions, instruction-following questions, and chat bots.
                                On the other hand, LLM judging also comes with the following weaknesses.
                                LLMs have biases towards their own answers.
                                Typically only GPT-4 and Claude-3-Opus are used as judges, as the highest-performing LLMs.
                                Yet, GPT-4 and Claude-3-Opus both favor their own answers.
                                They also have a noticeable difference in terms of variance and favorability of other models, and GPT-4 has variance in its own judging, even with temperature 0.
                                Additionally, LLMs make errors. For example, question 2 in Arena-Hard asks to write a C++ program to compute whether a given string can be converted to `abc' by swapping two letters.
                                GPT-4 incorrectly judges gpt-4-0314's solution as incorrect.
                                <br></br><br></br>

                                <strong>Human-as-a-judge. </strong>
                                In some sense, human evaluation could be considered the gold standard for judging LLMs, because humans are the ones interfacing with LLMs in many applications.
                                However, human judging is still often not the best choice.
                                First, human-judging is quite labor-intensive, especially for certain types of questions such as complex math integrals, coding problems, or long-context reasoning problems.
                                For these types of questions, it is common for humans to make mistakes, and it would be much simpler to have the answers upfront.
                                There can also be high variability from human to human. And finally, humans have biases such as the length of the output, the formatting, and the tone and formality.
                                <br></br><br></br>

                                <strong>Objective ground-truth judging. </strong>
                                Comparing the output of the LLM to a predetermined ground-truth answer (using exact-string matching and other techniques) comes with a number of strengths: it is trivial to score the outputs in terms of time and cost. Furthermore, it avoids the above weaknesses on having biases, errors, and variability in judging.
                                On the other hand, a weakness is that some types of questions do not have ground-truth answers, such as "write a travel guide to Hawaii."

                                <br></br><br></br>

                                <div className="table-container">
                                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                    <caption className="has-text-weight-bold">Correlation of objective ground truth scoring vs. LLM-as-a-judge scoring, on challenging math and logic tasks. On all tasks, the correlation is surprisingly low, showing that LLMs are not reliable judges for these tasks.</caption>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>AMC12 2024</th>
                                                <th>AIME 2024</th>
                                                <th>SMC 2023</th>
                                                <th>Zebra Puzzles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>GPT-4-Turbo</td>
                                                <td>0.227</td>
                                                <td>0.548</td>
                                                <td>0.247</td>
                                                <td>0.272</td>
                                            </tr>
                                            <tr>
                                                <td>Claude-3-Opus</td>
                                                <td>0.25</td>
                                                <td>0.596</td>
                                                <td>0.408</td>
                                                <td>0.098</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                Here, we run an ablation study by taking three math tasks and one reasoning task, and scoring them by either matching with the ground truth answer, or by asking an LLM judge to score the answer as either correct or incorrect. We use a judge prompt similar to MT-Bench and Arena Hard.
                                We find that the correlations for all tasks are far below a reasonable value, indicating that LLM judges are not appropriate for challenging math and logic tasks.
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div class="container is-max-desktop">
                    <div class="columns is-centered has-text-centered">
                        <div class="column is-four-fifths">
                            <h2 class="title is-3">Comparison to ChatBot Arena</h2>
                            <div class="content has-text-justified">
                            We compare our benchmark to a current prominent benchmark, ChatBot Arena. We see that while there are generally similar trends (a correlation coefficient of 0.89), yet some models are noticeably stronger on one benchmark vs. the other. For example, XXX.
                            </div>
                            <div className="columns is-centered is-vcentered">
                                    <div className="column">
                                        <figure className="image">
                                            <img src={livebench_chatbot_bar} alt="Bar plot comparing (scaled) ChatBot Arena and LiveBench scores across the same models." />
                                            <figcaption className="has-text-centered">Bar plot comparing (scaled) ChatBot Arena and LiveBench scores across the same models.</figcaption>
                                        </figure>
                                    </div>
                                    <div className="column">
                                        <figure className="image">
                                            <img src={livebench_chatbot_scatter} alt="Scatterplot comparing (scaled) ChatBot Arena and LiveBench scores across the same models." />
                                            <figcaption className="has-text-centered">Scatterplot comparing (scaled) ChatBot Arena and LiveBench scores across the same models.</figcaption>
                                        </figure>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>








            <section class="section" id="BibTeX">
                <div class="container is-max-desktop content">
                    <h2 class="title">BibTeX</h2>
                    <pre class="bibtex"><code>{bibtexEntry}</code></pre>
                </div>
            </section>
            <footer class="footer">
                <div class="container">
                    <div class="content has-text-centered">
                        <a class="icon-link"
                            href="./static/videos/nerfies_paper.pdf">
                            <i class="fas fa-file-pdf"></i>
                        </a>
                        <a class="icon-link" href="https://github.com/keunhong">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                    <div class="columns is-centered">
                        <div class="column is-8">
                            <div class="content">
                                <p>
                                    Lorem Ipsum
                                </p>
                                <p>
                                    This website is licensed under a <a rel="license"
                                        href="http://creativecommons.org/licenses/by-sa/4.0/">Creative
                                        Commons Attribution-ShareAlike 4.0 International License</a>.
                                    <br></br>The site was inspired by the <a
                                        href="https://github.com/nerfies/nerfies.github.io">Nerfies project</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}


export default Blog;