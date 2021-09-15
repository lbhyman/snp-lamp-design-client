import React from 'react';
import AssaySchematic from './assets/LAMP Assay.png';

const About = () => {
    return (
      <div className="About">
          <h1>[ ABOUT ]</h1>
          <p>
            Single-nucleotide polymorphisms (SNPs) are the most common source of genetic variation between individuals and have implications in human disease, 
            pathogen drug resistance, and agriculture. SNPs are typically detected using DNA sequencing, which requires laboratory sample preparation and 
            instrumentation, and thus cannot be easily deployed for on-site testing or in low-resource settings. SNP-LAMP with competitive DNA probes is a simple and 
            robust assay which is highly adaptable to these conditions. This site provides a tool to design competitive SNP-LAMP probes toward most nucleic 
            acid targets. If you are interested, a preprint of our manuscript can be found <a href='https://www.biorxiv.org/content/10.1101/2021.03.29.437576v1'>here</a>
            . Enjoy!
          </p>
          <div className="Images">
            <img src={AssaySchematic} alt="LAMP Assay" />
          </div>
      </div>
    );

}

export default About;