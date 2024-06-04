import React from 'react';
import './App.css';
import CSVTable from './Table/CSVTable';
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { bibtexEntry, tagline } from './constants';

function App() {
    return (
        <div className="App">
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
                                        <a href="." target="_blank" rel="noreferrer">Manley Roberts</a><sup>1</sup>,
                                    </span>
                                    <span class="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Arka Pal</a><sup>1</sup>,
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
                                        <a href="https://goldblum.github.io">Micah Goldblum</a><sup>2</sup>,
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
            <section class="section">
                <div class="columns is-centered">
                    <div class="column is-four-fifths">
                        <h2 class="title is-3">Leaderboard</h2>
                        <CSVTable />
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
                            href=".">
                            <i class="fas fa-file-pdf"></i>
                        </a>
                        <a class="icon-link" href=".">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                    <div class="columns is-centered">
                        <div class="column is-8">
                            <div class="content">
                                <p>

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


export default App;