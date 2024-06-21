import React from 'react';
import './Blog.css';
import 'bulma/css/bulma.css'
import { bibtexEntry } from './constants';
import livebench_results from './images/livebench_results.png';
import livebench_vs_chatbot_arena from './images/livebench_vs_chatbot_arena.png';
import livebench_vs_arena_hard from './images/livebench_vs_arena_hard.png';

import { Helmet } from 'react-helmet';

function Blog() {
    return (
        <div className="Blog">
            <Helmet>
                <title>LiveBench Blog</title>
            </Helmet>
            <section className="hero">
                <div className="hero-body">
                    <div className="container is-max-desktop">
                        <div className="columns is-centered">
                            <div className="column has-text-centered">
                                <h1 className="title is-1 publication-title">The Release of LiveBench</h1>
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
                                <div className="is-size-5 ">
                                    <span className="author-block">This work is sponsored by <a href="https://abacus.ai">Abacus.AI</a></span>
                                </div>

                                <div className="column has-text-centered">
                                    <div className="publication-links">
                                        <span className="link-block">
                                            <a href="./"
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
                            <h5 className="subtitle is-5">June 12, 2024</h5>
                            <div className="content has-text-justified">
                                <p className="c18"><span className="c9">Introducing </span><strong>LiveBench</strong><span className="c0">: a benchmark for LLMs designed with test set contamination and objective evaluation in mind</span>
                                </p>
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
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <span className="c0">
                                        Today, we release the initial batch of 960 questions and plan to release sets of questions every month. By doing this, we aim for LiveBench to be free from contamination, since every release will have novel questions.
                                    </span>
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <span className="c9">
                                        In addition to contamination, LiveBench avoids the pitfalls of LLM judging by including only questions that have an objective answer. While LLM judging and crowdsourced prompts and evaluations have many benefits, they also introduce significant biases and completely break down when judging the answers to hard questions. For example, we show in <a href="./livebench.pdf" target="_blank" rel="noreferrer">our paper</a> that for challenging reasoning and math problems, the pass/fail judgments from GPT-4-Turbo have an error rate of up to 46%.
                                    </span>
                                </p>
                                <div className="has-text-centered">
                                    <img src={livebench_results} alt="Radial Plot Visualization" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <span className="c0">
                                        LiveBench currently evaluates several prominent closed-source models and dozens of open-weight models ranging from 0.5B to 70B in size. LiveBench questions are difficult; for example, GPT-4-Turbo achieves around 50% accuracy on LiveBench overall. Furthermore, in our monthly updates, we will release new tasks and harder versions of tasks over time so that LiveBench can distinguish between the capabilities of LLMs as they improve in the future.
                                    </span>
                                </p>
                                <p className="c18">
                                    <span className="c0">
                                        We release all <a href="https://huggingface.co/livebench" target="_blank" rel="noreferrer">questions</a>, <a href="https://github.com/livebench/livebench" target="_blank" rel="noreferrer">code</a>, and model answers, and we welcome community engagement and collaboration for expanding the benchmark tasks and models.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container is-max-desktop">
                    <div className="columns is-centered has-text-centered">
                        <div className="column is-four-fifths">
                            <h2 className="title is-3">LiveBench Overview</h2>
                            <div className="content has-text-justified">
                                <p className="c18">
                                    <span className="c0">LiveBench currently consists of 18 tasks across 6 categories: reasoning, data analysis, math,
                                        coding, language comprehension, and instruction following. Each task falls into one of two types: </span>
                                </p>
                                <ol className="c28 lst-kix_st344of4rgcu-0 start" start="1">
                                    <li className="c18 c29 li-bullet-0">
                                        <span className="c0">tasks which use a continuously updated information source for their questions, e.g., data
                                            analysis based on recent Kaggle datasets, or fixing typos in recent arXiv abstracts </span>
                                    </li>
                                    <li className="c18 c29 li-bullet-0"><span className="c0">tasks which are more challenging or diverse versions of
                                        existing benchmark tasks, e.g., from AMPS, Big-Bench Hard, IFEval, or bAbI </span></li>
                                </ol>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18"><span className="c9">The categories and tasks included in LiveBench are:</span></p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c4">
                                    <strong>Math</strong><span className="c9">: questions from high school math competitions from the past 12
                                        months (AMC12, AIME, USAMO, IMO, SMC), as well as harder versions of </span>
                                    <span className="c12"><a className="c14"
                                        href="https://arxiv.org/pdf/2103.03874">AMPS</a></span>
                                    <span className="c0">&nbsp;questions</span>
                                </p>
                                <p className="c4 c15"><span className="c0"></span></p>
                                <p className="c4">
                                    <strong>Coding</strong><span className="c9">: two tasks from Leetcode and AtCoder (via </span>
                                    <span className="c12"><a className="c14"
                                        href="https://livecodebench.github.io">LiveCodeBench</a></span>
                                    <span className="c0">): code generation and a novel code completion task</span>
                                </p>
                                <p className="c4 c15"><span className="c0"></span></p>
                                <p className="c4">
                                    <strong>Reasoning</strong><span className="c9">: a harder version of Web of Lies from </span>
                                    <span className="c12"><a className="c14"
                                        href="https://arxiv.org/abs/2206.04615">Big-Bench
                                        Hard</a></span>
                                    <span className="c9">, a harder version of positional reasoning from </span>
                                    <span className="c12"><a className="c14"
                                        href="https://arxiv.org/abs/1502.05698">bAbI</a></span>
                                    <span className="c9">, and </span>
                                    <span className="c12"><a className="c14"
                                        href="https://en.wikipedia.org/wiki/Zebra_Puzzle">Zebra
                                        Puzzles</a></span>
                                </p>
                                <p className="c4 c15"><span className="c0"></span></p>
                                <p className="c4">
                                    <strong>Language Comprehension</strong><span className="c9">: three tasks featuring </span>
                                    <span className="c12"><a className="c14"
                                        href="https://www.nytimes.com/games/connections">Connections</a></span>
                                    <span className="c0">&nbsp;word puzzles, a typo removal task, and a movie synopsis unscrambling task from recent
                                        movies on IMDb and Wikipedia</span>
                                </p>
                                <p className="c4 c15"><span className="c0"></span></p>
                                <p className="c4">
                                    <strong>Instruction Following</strong>
                                    <span className="c9">
                                        : four tasks to paraphrase, simplify, summarize, or generate stories about recent new articles from The
                                        Guardian, subject to one or more instructions such as word limits or incorporating specific elements in the
                                        response
                                    </span>
                                </p>
                                <p className="c4 c15"><span className="c0"></span></p>
                                <p className="c4">
                                    <strong>Data Analysis</strong>
                                    <span className="c0">
                                        : three tasks, all of which use recent datasets from Kaggle and Socrata: table reformatting (among JSON,
                                        JSONL, Markdown, CSV, TSV, and HTML), predicting which columns can be used to join two tables, and
                                        predicting the
                                        correct type annotation of a data column
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container is-max-desktop">
                    <div className="columns is-centered has-text-centered">
                        <div className="column is-four-fifths">
                            <h2 className="title is-3">Motivation</h2>
                            <div className="content has-text-justified">
                                <p className="c18">
                                    <span className="c9">The goal in creating LiveBench is to ensure that its questions are not prone to </span><strong>contamination</strong><span className="c9">&nbsp;and are </span><strong>easily, accurately, and fairly evaluated</strong>
                                    <span className="c0">.</span>
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <span className="c0">
                                        Many LLM benchmarks are easily contaminated, since modern LLMs include large swaths of the internet in their
                                        training data. This is a problem for LLM evaluations since an LLM&rsquo;s performance on a benchmark will be
                                        artificially inflated, or contaminated, if the LLM has seen the questions of a benchmark during training.
                                        &nbsp;
                                    </span>
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <span className="c9">For example, </span>
                                    <span className="c12"><a className="c14"
                                        href="https://arxiv.org/abs/2310.10628" target="_blank" rel="noreferrer">recent</a></span>
                                    <span className="c9">&nbsp;</span>
                                    <span className="c12"><a className="c14"
                                        href="http://livecodebench.github.io" target="_blank" rel="noreferrer">work</a></span>
                                    <span className="c9">
                                        &nbsp;shows that LLMs&#39; performance on Codeforces plummets after the training data cutoff date of the
                                        LLM, and before the cutoff date, performance is highly correlated with the number of times the problem
                                        appears on
                                        GitHub. Similarly, a <a className="c14"
                                            href="https://arxiv.org/pdf/2405.00332" target="_blank" rel="noreferrer">recent
                                            hand-crafted variant</a> of the established math dataset, GSM8K, shows evidence that several models have
                                        overfitted to this benchmark.</span>
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <span className="c9">It is also important to ensure that the way we </span><span className="c9 c34">evaluate</span>
                                    <span className="c0">&nbsp;an LLM&rsquo;s answer is fair and free from bias. In contamination-free benchmarks, there
                                        are two main approaches that benchmarks have taken: LLM-as-a-judge and Humans-as-a-judge.</span>
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <strong>LLM-as-a-judge</strong>
                                    <span className="c9">
                                        : LLM judging is fast and relatively cheap. Furthermore, its biggest strength is its ability to judge
                                        open-ended questions, instruction-following questions, and chat bots. However, LLM judging has some
                                        important
                                        shortcomings. (1) LLMs have biases towards their own answers. Typically only GPT-4 and Claude-3-Opus are
                                        used as judges, as the highest-performing LLMs. Yet, GPT-4 and Claude-3-Opus both <a className="c14"
                                            href="https://lmsys.org/blog/2024-04-19-arena-hard/" target="_blank" rel="noreferrer">favor their own answers</a>.
                                        (2) They
                                        also have a noticeable difference in terms of variance and favorability of other models, and GPT-4 has
                                        variance in its own judging, even with temperature 0. (3) For questions that have ground truth answers, LLM
                                        judges can
                                        make mistakes. For example, question 2 in Arena-Hard asks to write a C++ program to compute whether a given
                                        string can be converted to &lsquo;abc&rsquo; by swapping two letters. GPT-4 incorrectly judges
                                        its own
                                        solution as incorrect. We present more evidence of this phenomenon below.
                                    </span>
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <strong>Human-as-a-judge</strong>
                                        : While human evaluation is great for capturing the preferences of a crowd, using a human-as-a-judge has
                                        many disadvantages: (1) human-judging is quite labor-intensive, especially for certain types of questions
                                        such as
                                        complex math integrals, coding problems, or long-context reasoning problems. (2) For these types of
                                        questions, it is also common for humans to make mistakes. (3) There can also be high variability from human
                                        to human. And
                                        finally, (4) humans also evaluate on metrics other than correctness &ndash; for example, they may prefer
                                        outputs of a particular length, &nbsp;with a particular formatting tone, and formality.
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    In contrast to these approaches, LiveBench employs objective, ground truth
                                    judgements to evaluate each question. 
                                </p>
                                <p className="c10"><span className="c0"></span></p>
                                <p className="c18">
                                    <strong>Objective ground-truth judging</strong>
                                    <span className="c0">
                                        &nbsp;compares the output of the LLM to a predetermined ground-truth answer. This approach is great because
                                        it is trivial to score the outputs in terms of time and cost. Furthermore, it avoids the above mentioned
                                        weaknesses
                                        in terms of biases, errors, and variability in judging. One weakness is that some types of questions do not
                                        have ground-truth answers, such as &quot;write a travel guide to Hawaii.&quot;. However, while this limits
                                        the type
                                        of questions that can be evaluated, it does not affect the validity of evaluation for the questions that can
                                        be judged in this manner.
                                    </span>
                                </p>
                                <div className="table-container">
                                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                        <caption className="has-text-weight-bold">Error rate of LLM-as-a-judge scoring on challenging math (AMC, AIME, SMC) and reasoning (Zebra puzzles) tasks. The judge is GPT-4-Turbo, and it judges model outputs from GPT-4-Turbo and Claude-3-Opus. On all tasks, the error rate is surprisingly high, showing that LLMs are not reliable judges for these tasks
                                        </caption>
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
                                                <td>0.380</td>
                                                <td>0.214</td>
                                                <td>0.353</td>
                                                <td>0.420</td>
                                            </tr>
                                            <tr>
                                                <td>Claude-3-Opus</td>
                                                <td>0.388</td>
                                                <td>0.103</td>
                                                <td>0.294</td>
                                                <td>0.460</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="c5">
                                    <span className="c0 c21">
                                        Here, we can see that using objective ground-truth judging is superior to LLM judges, particularly on our tasks. On these four tasks, while objective ground-truth judging is perfect, we find that the error rates of LLM judging are far above a reasonable value, indicating that LLM judges are not appropriate for challenging math and logic tasks.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container is-max-desktop">
                    <div className="columns is-centered has-text-centered">
                        <div className="column is-four-fifths">
                            <h2 className="title is-3">Comparison to Other Benchmarks</h2>
                            <div className="content has-text-justified">
                                We compare our benchmark to current prominent LLM benchmarks: <a href="https://chat.lmsys.org/?leaderboard" target="_blank" rel="noreferrer">ChatBot Arena</a> and <a href="https://lmsys.org/blog/2024-04-19-arena-hard/" target="_blank" rel="noreferrer">Arena-Hard</a>. We see that while there are generally similar trends, some models are noticeably stronger on one benchmark vs. the other, potentially indicating some downsides of LLM judging.
                                <div className="columns is-centered is-vcentered">
                                    <div className="column">
                                        <figure className="image">
                                            <img src={livebench_vs_chatbot_arena} alt="Bar plot comparing LiveBench and ChatBot Arena scores across the same models." />
                                            <figcaption className="has-text-centered">Bar plot comparing LiveBench and ChatBot Arena scores across the same models.
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <div className="columns is-centered is-vcentered">
                                    <div className="column">
                                        <figure className="image">
                                            <img src={livebench_vs_arena_hard} alt="Bar plot comparing LiveBench and Arena-Hard scores across the same models." />
                                            <figcaption className="has-text-centered">Bar plot comparing LiveBench and Arena-Hard scores across the same models. Surprisingly, GPT-4 models perform substantially better on Arena-Hard relative to LiveBench, potentially due to the <a href="https://lmsys.org/blog/2024-04-19-arena-hard/" target="_blank" rel="noreferrer">known bias</a> from using GPT-4 itself as the judge.
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                                <p className="c5">
                                    We find that Pearson&#39;s correlation coefficient of model scores
                                    between LiveBench and ChatBot Arena is 0.90 and between LiveBench and Arena-Hard is 0.89.
                                </p>
                                <p className="c5">
                                    Based on the plots and the correlation coefficients, we see that LiveBench
                                    generally follows similar trends, yet some models are noticeably stronger on one benchmark vs. the other.
                                    For example, gpt-4-0125-preview and gpt-4-turbo-2024-04-09 perform substantially better on
                                    Arena-Hard compared to LiveBench -- likely due to the known bias from using gpt-4 itself as the LLM
                                    judge.
                                </p>
                                <p className="c26 c15"><span className="c0 c21"></span></p>
                                <p className="c26">
                                    We are very excited about the future of LiveBench and actively would like to partner with researchers to
                                    expand the questions, task list, categories, and models evaluated. If you&rsquo;d like to contribute or have
                                    any questions, <a href="mailto:samuel@abacus.ai,colin@abacus.ai">please get in touch</a>.
                                </p>
                            </div>                             
                        </div>
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
                                        href="https://github.com/nerfies/nerfies.github.io" target="_blank" rel="noreferrer">Nerfies project</a> and by <a
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


export default Blog;