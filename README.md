<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JDipi/impMyCanvas">
    <img src="logo.svg" alt="Logo" width="150">
  </a>

<h3 align="center">PimpMyCanvas</h3>

  <p align="center">
Chrome extension for customizing the Canvas LMS UI
    <br />
    <a href="https://github.com/JDipi/impMyCanvas/issues">Report Bug</a>
    ·
    <a href="https://github.com/JDipi/impMyCanvas/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#colors">Colors</a></li>
        <li><a href="#theme-library">Theme Library</a></li>
        <li><a href="#gradient">Gradient</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

### About The Project

#### By JDipi and [ExternalHost0](https://github.com/ExternalHost0)
##### PimpMyCanvas is a lightweight Chrome extension for customizing the Canvas LMS User Interface

This Chrome extension based off of a Tampermonkey userscript my friend ExternalHost0 made. You can find his script [here](https://github.com/ExternalHost0/PimpMyCanvas).



### Built With

* [![JQuery][JQuery.com]][JQuery-url]
* [![Tailwind][tailwind-shield]][Tailwind-url]
* [![DaisyUI][DaisyUI-shield]][DaisyUI-url]
* [![Chrome][Chrome-shield]][Chrome-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Getting Started



### Installation

You can download the extension from the Chrome Web Store linked below:
### [INSTALL HERE](https://chrome.google.com/webstore/detail/pimpmycanvas/bgpoafmllopbhciofdpjfeoaadfhhhnd)

If you want to manually download the extension go to the releases page on this repository for the crx file, or download the source code and pack it yourself.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Usage

Navigate to any Canvas domain and click the extension icon in the top right. This will show the extension window, which looks like this:
<p align="center">
  <img src="https://user-images.githubusercontent.com/48573618/211132722-ecffa4ae-6085-4497-9698-a15ffa801613.png" />
</p>

#### Colors

The colors tab allows you to set colors of your choice for all the major elements in Canvas.
<p align="center">
  <img src="https://user-images.githubusercontent.com/48573618/211132796-9940bc2e-3da8-404e-af94-d5c9bf8fd982.png" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://user-images.githubusercontent.com/48573618/211132866-1c01cc0a-3b3e-4ffb-999f-6721e812f954.png" />
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Theme Library

The theme library tab allows you to apply, edit, and delete saved Canvas themes. If you set some colors you like in the colors tab, you can save them as a theme under the theme library tab. PMC also comes with some themes by default, but if you make a custom theme and want it to be included with a future PMC release, there is an option to submit a theme request. I am currently using a [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSe_UoYmPhYp0attrSOfkD9wTuKcJaYobyLp0afcJ5oBWLiarQ/viewform?usp=sf_link) to track theme requests.
<p align="center">
  <img src="https://user-images.githubusercontent.com/48573618/211132999-a84a1315-5fc6-4c3b-b17d-cf143103d01a.png" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://user-images.githubusercontent.com/48573618/211133169-68d944f3-92b1-451f-895b-4fa6a11743e9.png" />
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Gradient

The gradient tab allows you to customize a gradient that runs along the Canvas sidebar. The stock PMC themes come with gradients, but in order to set your own you must find or create a color palette on [coolors.co](https://coolors.co). See the image on the right for how to get the url from coolors.co.
There are also options to change the angle and speed of the gradient.
<p align="center">
  <img src="https://user-images.githubusercontent.com/48573618/211133213-f0d602d3-f0be-4895-9c7c-49b350a00d24.png" />
  &nbsp;&nbsp;&nbsp;
  <img title="How to get coolors.co url" src="https://user-images.githubusercontent.com/48573618/211133564-60259a9c-9d06-44dc-87db-310ce560401f.png" />
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Settings

The settings tab has several miscellaneous options, such as importing / exporting themes (in JSON format), reporting issues, getting help, and resetting all PMC settings.

<p align="center">
  <img src="https://user-images.githubusercontent.com/48573618/211133682-9d67f5af-d924-4d47-bf55-67228b84c708.png" />
  &nbsp;&nbsp;&nbsp;
 <img src="https://user-images.githubusercontent.com/48573618/211133702-bda412bd-2056-4241-8c00-c28826de1df9.png" />
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Roadmap
- [ ] Add gradient preview swatches
- [ ] Better style for gradient animation speed control
- [ ] Find an alternative to Google Forms for the submission of custom themes
- [ ] Make a button to load the default themes
- [ ] A gradient editor that is independent of coolors.co, hopefully like [this](https://cssgradient.io/) 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



## Contact

Send us a message! - [pimpmycanvas@googlegroups.com](mailto:pimpmycanvas@googlegroups.com)



## Acknowledgments

* Thank you to my friend [ExternalHost0](https://github.com/ExternalHost0) for making the [userscript](https://github.com/ExternalHost0/PimpMyCanvas) that inspired this extension!


[contributors-shield]: https://img.shields.io/github/contributors/JDipi/PimpMyCanvas.svg?style=for-the-badge
[contributors-url]: https://github.com/JDipi/PimpMyCanvas/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/JDipi/PimpMyCanvas.svg?style=for-the-badge
[forks-url]: https://github.com/JDipi/PimpMyCanvas/network/members
[stars-shield]: https://img.shields.io/github/stars/JDipi/PimpMyCanvas.svg?style=for-the-badge
[stars-url]: https://github.com/JDipi/PimpMyCanvas/stargazers
[issues-shield]: https://img.shields.io/github/issues/JDipi/PimpMyCanvas.svg?style=for-the-badge
[issues-url]: https://github.com/JDipi/PimpMyCanvas/issues
[license-shield]: https://img.shields.io/github/license/JDipi/PimpMyCanvas.svg?style=for-the-badge
[license-url]: https://github.com/JDipi/PimpMyCanvas/blob/master/LICENSE.txt

[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Tailwind-shield]: https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[DaisyUI-shield]: https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white
[DaisyUI-url]: https://daisyui.com/
[Chrome-shield]: https://img.shields.io/badge/chrome%20extension%20api-FF0000?style=for-the-badge&logo=googlechrome&logoColor=white
[Chrome-url]: https://developer.chrome.com/docs/extensions/reference/