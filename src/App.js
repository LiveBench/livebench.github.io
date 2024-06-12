import React from 'react';
import CSVTable from './Table/CSVTable';
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';
import livebench_results from './images/livebench_results.png';
import { bibtexEntry, tagline } from './constants';

function App() {
    return (
        <div className="App">
            <section className="hero">
                <div className="hero-body">
                    <div className="container is-max-desktop">
                        <div className="columns is-centered">
                            <div className="column has-text-centered">
                                <h1 className="title is-1 publication-title">LiveBench</h1>
                                <h3 className="title is-3">A Challenging, Contamination-Free LLM Benchmark</h3>

                                <div className="is-size-5 publication-authors">
                                    <span className="author-block">
                                        <a href="https://crwhite.ml" target="_blank" rel="noreferrer">Colin White*</a><sup>1</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="http://spamueldooley.com" target="_blank" rel="noreferrer">Samuel Dooley*</a><sup>1</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Manley Roberts*</a><sup>1</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Arka Pal*</a><sup>1</sup>,
                                    </span>
                                    <br></br>
                                    <span className="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Ben Feuer</a><sup>2</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://tmfs10.github.io/" target="_blank" rel="noreferrer">Siddhartha Jain</a><sup>3</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://www.ravid-shwartz-ziv.com" target="_blank" rel="noreferrer">Ravid Shwartz-Ziv</a><sup>2</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://neelsjain.github.io/" target="_blank" rel="noreferrer">Neel Jain</a><sup>4</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://khalidsaifullaah.github.io/" target="_blank" rel="noreferrer">Khalid Saifullah</a><sup>4</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="." target="_blank" rel="noreferrer">Siddartha Naidu</a><sup>1</sup>,
                                    </span>
                                    <br></br>
                                    <span className="author-block">
                                        <a href="https://chinmayhegde.github.io">Chinmay Hegde</a><sup>2</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="http://yann.lecun.com">Yann LeCun</a><sup>2</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://www.cs.umd.edu/~tomg/">Tom Goldstein</a><sup>4</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://willieneis.github.io" target="_blank" rel="noreferrer">Willie Neiswanger</a><sup>5</sup>,
                                    </span>
                                    <span className="author-block">
                                        <a href="https://goldblum.github.io">Micah Goldblum</a><sup>2</sup>
                                    </span>
                                </div>

                                <div className="is-size-5 publication-authors">
                                    <span className="author-block"><sup>1</sup>Abacus.AI,</span>
                                    <span className="author-block"><sup>2</sup>NYU,</span>
                                    <span className="author-block"><sup>3</sup>Nvidia,</span>
                                    <span className="author-block"><sup>4</sup>UMD,</span>
                                    <span className="author-block"><sup>5</sup>USC</span>
                                </div>

                                <div className="column has-text-centered">
                                    <div className="publication-links">
                                        <span className="link-block">
                                            <a href="./#"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-solid fa-medal"></i>
                                                </span>
                                                <span>Leaderboard</span>
                                            </a>
                                            <a href="./#/blog"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-regular fa-newspaper"></i>
                                                </span>
                                                <span>Blog</span>
                                            </a>
                                        </span>
                                        <span className="link-block">
                                            <a href="https://github.com/livebench/livebench"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-brands fa-github"></i>
                                                </span>
                                                <span>Code</span>
                                            </a>
                                        </span>
                                        <span className="link-block">
                                            <a href="https://huggingface.co/livebench"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-solid fa-database"></i>
                                                </span>
                                                <span>Data</span>
                                            </a>
                                        </span>
                                        <span className="link-block">
                                            <a href="./livebench.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i class="fa-regular fa-newspaper"></i>
                                                </span>
                                                <span>Paper</span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container is-max-desktop">
                    <div className="columns is-centered has-text-centered">
                        <div className="column is-four-fifths">
                            <h2 className="title is-3">Introduction</h2>
                            <div className="content has-text-justified">
                            <p className="c18"><span className="c9">Introducing </span><strong>LiveBench</strong><span className="c0">: a benchmark for LLMs designed with test set contamination and objective evaluation in mind</span>
                            </p>
                            <p className="c10"><span className="c0"></span></p>
                                <p className="c18"><span className="c9">LiveBench has the following properties: </span>
                                </p>
                                <ul className="c28 lst-kix_r92srvgun7j-0 start">
                                    <li className="c18 c29 li-bullet-0"><span className="c0">LiveBench is designed to limit potential contamination by releasing new questions monthly, as well as having questions based on recently-released datasets, arXiv papers, news articles, and IMDb movie synopses.</span>
                                    </li>
                                    <li className="c18 c29 li-bullet-0"><span className="c0">Each question has verifiable, objective ground-truth answers, allowing hard questions to be scored accurately and automatically, without the use of an LLM judge.</span>
                                    </li>
                                    <li className="c18 c29 li-bullet-0"><span className="c0">LiveBench currently contains a set of 18 diverse tasks across 6 categories, and we will release new, harder tasks over time.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="columns is-centered">
                    <div className="column is-four-fifths">
                        <h2 className="title is-3">Leaderboard</h2>
                        <CSVTable />
                    </div>
                </div>
            </section>

            <section className="section" id="BibTeX">
                <div className="container is-max-desktop content">
                    <h2 className="title">BibTeX</h2>
                    <pre className="bibtex"><code>{bibtexEntry}</code></pre>
                </div>
            </section>


            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <a className="icon-link"
                            href="./livebench.pdf">
                            <i className="fas fa-file-pdf"></i>
                        </a>
                        <a className="icon-link" href="https://github.com/LiveBench/LiveBench">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <div className="columns is-centered">
                        <div className="column is-8">
                            <div className="content">
                                <p>

                                </p>
                                <p>
                                    This website is licensed under a <a rel="license"
                                        href="http://creativecommons.org/licenses/by-sa/4.0/">Creative
                                        Commons Attribution-ShareAlike 4.0 International License</a>.
                                    <br></br>The site was inspired by the <a
                                        href="https://github.com/nerfies/nerfies.github.io" target="_blank" rel="noreferrer">Nerfies project</a> and by<a
                                        href="https://livecodebench.github.io/" target="_blank" rel="noreferrer">LiveCodeBench</a>.
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