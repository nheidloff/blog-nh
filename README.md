# Blog from Niklas Heidloff - heidloff.net

This repo contains the blog from [Niklas Heidloff](https://heidloff.net), both the blog application as well as the blog data.

<kbd><img src="assets/img/2023/01/IMG_2075.JPG" /></kbd>

The blog is a static website hosted on GitHub Pages. Blog posts are written in Markdown. The following technologies are used:

* [Jekyll](https://jekyllrb.com/), Liquid and Ruby
* [GitHub Pages](https://pages.github.com/) and GitHub Actions
* [Chirpy Jekyll Theme](https://github.com/cotes2020/jekyll-theme-chirpy)

The Chirpy Jekyll Theme is available under the MIT license. The biggest addition of this repo is the responsive image at the top of the home page.


## Setup your own Blogs

To use this repo for your own blogs, delete `_posts` and `assets/img` and change the configuration, for example in `_config.yaml`. 

Create a brand new repository and name it `<GH_USERNAME>.github.io`, where `GH_USERNAME` represents your GitHub username.

Follow the instructions in the [Jekyll Docs](https://jekyllrb.com/docs/installation/) to complete the installation of `Ruby`, `RubyGems`, `Jekyll` and `Bundler`.


## Usage

Install dependencies:

```
bundle install
```

Run locally:

```
bundle exec jekyll serve
or
bash tools/run
```

Run locally as container:

```
docker run -it --rm \
    --volume="$PWD:/srv/jekyll" \
    -p 4000:4000 jekyll/jekyll \
    jekyll serve
```

Open http://localhost:4000.

Test locally before pushing:

```
bash tools/test
```

If you need to change JavaScript code, run this in the first terminal:

```
bash tools/run
```

Run this in the second terminal:

```
npx gulp dev
```

To generate the minimized and uglified zip files, run this command:

```
npx gulp 
```


## License

This work is published under Apache License v2.

