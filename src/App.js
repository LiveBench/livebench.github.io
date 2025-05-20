import React, { useState } from 'react';
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';
// import livebench_results from './images/livebench_results.png';
import { bibtexEntry } from './constants';
import CSVTable from './Table/CSVTable';


function App() {
    const [selectedDate, setSelectedDate] = useState('2025-05-17');
    const [sliderPosition, setSliderPosition] = useState(6);
    const maxSliderValue = 6;

    const handleSliderChange = (event) => {
        const value = event.target.value;
        setSliderPosition(value);

        if (value === '0') {
            setSelectedDate('2024-06-24');
        } else if (value === '1') {
            setSelectedDate('2024-07-26');
        } else if (value === '2') {
            setSelectedDate('2024-08-31');
        } else if (value === '3'){
            setSelectedDate('2024-11-25');
        } else if (value === '4') {
            setSelectedDate('2025-04-02');
        } else if (value === '5'){
            setSelectedDate('2025-04-25');
        } else {
            setSelectedDate('2025-05-17');
        }
    };

    const getSliderValue = () => {
        if (selectedDate === '2024-06-24') return '0';
        if (selectedDate === '2024-07-26') return '1';
        if (selectedDate === '2024-08-31') return '2';
        if (selectedDate === '2024-11-25') return '3';
        if (selectedDate === '2025-04-02') return '4';
        if (selectedDate === '2025-04-25') return '5';
        return '6';
    };

    return (
        <div className="App">
            <section className="hero pb-0">
                <div className="hero-body">
                    <div className="container is-max-desktop">
                        <div className="columns is-centered">
                            <div className="column has-text-centered">
                                <h1 className="title is-1 publication-title mb-0">LiveBench</h1>
                                <h3 className="title is-3 mb-1">A Challenging, Contamination-Free LLM Benchmark</h3>
                                <div className="is-size-5 ">
                                    <span className="author-block">LiveBench will appear as a <a href="https://openreview.net/forum?id=sKYHBTAxVa">Spotlight Paper</a> in ICLR 2025.</span>
                                    <br></br>
                                    <span className="author-block">This work is sponsored by <a href="https://abacus.ai">Abacus.AI</a></span>
                                </div>

                                <div className="column has-text-centered">
                                    <div className="publication-links">
                                        <span className="link-block">
                                            <button onClick={() => {document.getElementById('Leaderboard').scrollIntoView({ behavior: 'smooth' });}}
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-solid fa-medal"></i>
                                                </span>
                                                <span>Leaderboard</span>
                                            </button>
                                            
                                        </span>
                                        <span className="link-block">
                                            <a href="./#/details"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-regular fa-newspaper"></i>
                                                </span>
                                                <span>Details</span>
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
                                            <a href="https://huggingface.co/collections/livebench/livebench-67eaef9bb68b45b17a197a98"
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
                                            <a href="https://arxiv.org/abs/2406.19314"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="external-link button is-normal is-rounded is-dark">
                                                <span className="icon">
                                                    <i className="fa-regular fa-newspaper"></i>
                                                </span>
                                                <span>Paper</span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div className="column has-text-centered">
                                    <a href="https://liveswebench.ai" className="liveswebench-callout" target='_blank' rel="noopener noreferrer"> 
                                        <span>New! Check out LiveSWEBench, our new benchmark for AI coding agents</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section p-0">
                <div className="container is-max-desktop">
                    <div className="columns is-centered has-text-centered">
                        <div className="column is-four-fifths">
                            <h2 className="title is-3 mb-1">Introduction</h2>
                            <div className="content has-text-justified">
                            <p className="c18"><span className="c9">Introducing </span><strong>LiveBench</strong><span className="c0">: a benchmark for LLMs designed with test set contamination and objective evaluation in mind. It has the following properties:</span>
                            </p>
                            <p className="c10"><span className="c0"></span></p>
                                <ul className="c28 lst-kix_r92srvgun7j-0 start">
                                    <li className="c18 c29 li-bullet-0"><span className="c0">LiveBench limits potential contamination by releasing new questions regularly.</span>
                                    </li>
                                    <li className="c18 c29 li-bullet-0"><span className="c0">Each question has verifiable, objective ground-truth answers, eliminating the need for an LLM judge.</span>
                                    </li>
                                    <li className="c18 c29 li-bullet-0"><span className="c0">LiveBench currently contains a set of 18 diverse tasks across 6 categories, and we will release new, harder tasks over time.</span>
                                    </li>
                                </ul>
                                <p className="c18"><span className="c9"><strong>We will evaluate your model on LiveBench!</strong> Open a <a href="https://github.com/LiveBench/LiveBench/issues" target="_blank" rel="noreferrer">github issue</a> or email us at <a href="mailto:livebench@livebench.ai" target="_blank" rel="noreferrer">livebench@livebench.ai</a>!</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container is-max-desktop">
                    <h2 className="title is-3 has-text-centered mb-1" id="Leaderboard">Leaderboard</h2>
                    <div className="is-size-6 has-text-centered">
                        <span>
                            We update questions regularly so that the benchmark completely refreshes every 6 months. 
                            Some questions for previous releases are available <a href="https://huggingface.co/livebench" target="_blank" rel="noreferrer">here</a>.
                            The most recent version is <strong>LiveBench-2025-04-25</strong>. This verison includes updated coding and data analysis questions.
                        <br></br><strong>To further reduce contamination, we delay publicly releasing the questions from the most-recent updates. LiveBench-2025-04-02 and LiveBench-2025-04-25 comprise ~300 new questions, so currently ~30% of questions in LiveBench are not publicly released.</strong>
                        <br></br><br></br>
                        <span className="link-block mt-1">
                            <a href="https://github.com/LiveBench/LiveBench/blob/main/changelog.md"
                                target="_blank"
                                rel="noreferrer"
                                className="external-link button is-normal is-rounded is-dark">
                                <span className="icon">
                                    <i className="fa-solid fa-file-lines"></i>
                                </span>
                                <span>View Full Changelog</span>
                            </a>
                        </span>
                        </span>
                    </div>
                    <div className="field" style={{ marginTop: '40px' }}>
                        <div className="is-flex is-justify-content-center is-align-items-center">
                            <div style={{ position: 'relative', width: '300px' }}>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxSliderValue}
                                    step="1"
                                    value={getSliderValue()}
                                    onChange={handleSliderChange}
                                    className="slider is-fullwidth mx-2"
                                    style={{ width: '100%' }}
                                />
                                <div
                                    style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    left: `${(sliderPosition / (maxSliderValue + 0.1)) * 100 + 2.5}%`,
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#3e3e3e',
                                    color: '#fff',
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    whiteSpace: 'nowrap',
                                    }}
                                >
                                    {selectedDate}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '-6px',
                                            left: '50%',
                                            transform: 'translateX(-50%) rotate(45deg)',
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: '#3e3e3e',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns is-centered">
                    <div className="column is-four-fifths">
                        <CSVTable dateStr={selectedDate}/>
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
                <div className="container mb-3">
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
                </div>
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-8">
                            <div className="content">
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


export default App;