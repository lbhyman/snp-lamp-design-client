import React from 'react';

import BananaLeaf from './assets/Website Figs-01.png';
import GibbsNoSink from './assets/Website Figs-02.png';
import GibbsSink from './assets/Website Figs-03.png';
import CombinatorialProbes from './assets/Website Figs-04.png';
import AssaySchematic from './assets/Website Figs-05.png';
import COVIDResults from './assets/Website Figs-06.png';
import StrandDiagram from './assets/Website Figs-07.png';


const About = () => {
    return (
      <div className="About">
          <h1>[ ABOUT ]</h1>

          <div className="About_sub">
            <div className="Text">
              <h2>Point-of-care and field assays</h2>
              <p>
                Single-nucleotide polymorphisms (SNPs) are major determinants of drug resistance in both human and agricultural pathogens. 
                However, it can be difficult to deploy SNP tests in developing areas of the world where laboratory equipment and cold supply chains are limited. 
                We chose the popular, field-deployable Loop-mediated Isothermal Amplification (LAMP) assay and enhanced it with highly specific SNP probes. 
                This tool provides researchers the means to design optimal probes for this assay.
              </p>
            </div>

            <div className="Images">
              <img src={BananaLeaf} alt="Banana leaf" />
            </div>
          </div>

          <div className="About_sub">
            <div className="Images">
              <img src={GibbsNoSink} alt="Thermodynamics of probe binding without a sink complex" />
            </div>
            <div className="Text">
              <h2>Conventional SNP probe design</h2>
              <p>
                Conventional SNP probes can consist of a DNA duplex with a disruptable fluorophore-quencher pair. 
                Upon binding to a SNP target sequence, the fluorophore-quencher pair is disrupted, producing a detectable fluorescent signal. 
                These probes can be challenging to design due to the small thermodynamic effect of a single-base mismatch between two DNA strands: 
                a fluorescent probe specific to the SNP sequence tends to bind its wildtype (WT) counterpart with similar strength. 
                This can make SNP and WT sequences difficult to distinguish, even with careful probe design. This is where competitive probes come in.
              </p>
            </div>
          </div>

          <div className="About_sub">
            <div className="Text">
              <h2>Competitive SNP probes</h2>
              <p>
                Competitive probes improve upon this design by incorporating a WT-specific 'sink' complex. 
                This sink is able to competitively displace the fluorescent probe from the WT sequence, exacerbating the thermodynamic mismatch effect.
                As a result, competitive probes can easily distinguish between SNP and WT alleles.
              </p>
            </div>
            <div className="Images">
              <img src={GibbsSink} alt="Thermodynamics of probe binding with a sink complex" />
            </div>
          </div>

          <div className="About_sub">
            <div className="Images">
              <img src={CombinatorialProbes} alt="Combinatorial explosion of probe designs" />
            </div>
            <div className="Text">
              <h2>Computational probe design</h2>
              <p>
                Probe and sink strands can occupy any region or length along the target sequences. 
                With four total strands, this leads to a combinatorial explosion which can exceed 60 million unique candidate probe designs. 
                Probe designs are therefore difficult to optimize by hand.
                This tool provides high-quality probes toward most target sequences by searching a database of Genetic Algorithm - designed solutions.
              </p>
            </div>
          </div>

          <div className="About_sub">
            <div className="Text">
              <h2>The assay</h2>
              <p>
                The competitive SNP-LAMP assay is simple: simply add the primers, probes, and template to a LAMP reaction, incubate, and then anneal probes from 95C to 20C. 
                SNP templates will yield increased fluorescence relative to WT templates or negative controls. For a greater signal, this assay can also be performed in a 
                two-step format where probes are added after amplification.
              </p>
            </div>
            <div className="Images">
              <img src={AssaySchematic} alt="Schematic of the competitive SNP-LAMP assay" />
            </div>
          </div>

          <div className="About_sub">
            <div className="Images">
              <img src={COVIDResults} alt="Assay results with two SARS-CoV-2 Spike protein variants" />
            </div>
            <div className="Text">
              <h2>Our results</h2>
              <p>
                We demonstrated this assay with several RNA targets, including an infectious mutation in the SARS-CoV-2 Spike protein. 
                In this example, the mutated sequence was clearly distinguishable from the original, as well as the non-template background.
              </p>
            </div>

          </div>

          <div className="About_sub">
            <div className="Text">
              <h2>What the output means</h2>
              <p>
                This tool will output four DNA sequences that comprise a competitive probe set. The ProbeF and ProbeQ strands represent the SNP-specific probe set containing the fluorophore 
                and quencher, respectively. The Sink and Sink* strands are specific to the WT strand. All strand only require minor modification before they can be ordered.
              </p>
            </div>
            <div className="Images">
              <img src={StrandDiagram} alt="Schematic of the competitive SNP-LAMP assay strands" />
            </div>
          </div>

      </div>
    );

}

export default About;