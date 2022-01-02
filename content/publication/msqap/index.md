---
title: "Answer Generation for Questions With Multiple Information Sources in E-Commerce"

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here 
# and it will be replaced with their full name and linked to their profile.
authors:
- Anand A. Rajasekar
- Nikesh Garera

# # Author notes (optional)
# author_notes:
# - "Equal contribution"
# - "Equal contribution"

date: "2021-11-27T00:00:00Z"
# doi: "2010.16399"

# Schedule page publish date (NOT publication's date).
publishDate: "2017-01-01T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["3"]

# Publication name and optional abbreviated publication name.
# publication: Chemical Science 2020
# publication_short: Chem. Sci.

abstract: Automatic question answering is an important yet challenging task in E-commerce given the millions of questions posted by users about the product that they are interested in purchasing. Hence, there is a great demand for automatic answer generation systems that provide quick responses using related information about the product. There are three sources of knowledge available for answering a user posted query, they are reviews, duplicate or similar questions, and specifications. Effectively utilizing these information sources will greatly aid us in answering complex questions. However, there are two main challenges present in exploiting these sources:(i) The presence of irrelevant information and (ii) the presence of ambiguity of sentiment present in reviews and similar questions. Through this work we propose a novel pipeline (MSQAP) that utilizes the rich information present in the aforementioned sources by separately performing relevancy and ambiguity prediction before generating a response.
Experimental results show that our relevancy prediction model (BERT-QA) outperforms all other variants and has an improvement of 12.36% in F1 score compared to the BERT-base baseline. Our generation model (T5-QA) outperforms the baselines in all content preservation metrics such as BLEU, ROUGE and has an average improvement of 35.02% in ROUGE and 198.75% in BLEU compared to the highest performing baseline (HSSC-q). Human evaluation of our pipeline shows us that our method has an overall improvement in accuracy of 30.7% over the generation model (T5-QA), resulting in our full pipeline-based approach (MSQAP) providing more accurate answers. To the best of our knowledge, this is the first work in the e-commerce domain that automatically generates natural language answers combining the information present in diverse sources such as specifications, similar questions, and reviews data. 


# Summary. An optional shortened abstract.
summary: We propose a novel answer generation pipeline using relevant information from multiple data sources of a product.
tags: []

# Display this page in the Featured widget?
featured: false

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'https://arxiv.org/abs/2111.14003'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: ''
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---

<!-- {{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}}

Supplementary notes can be added here, including [code, math, and images](https://wowchemy.com/docs/writing-markdown-latex/). -->
