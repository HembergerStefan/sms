# **Website Appearance Specification**
**Create date:** 2022-08-15

**Last modified:** 2022-08-19

**Author:** Julian Berger

**Version:** 1.0

---

&nbsp;

## **Table of Content**
[**Font**](#font)

[**Font Sizes**](#font-sizes)

[**Color Themes**](#color-themes)

[**Wireframe/Mockup Sizing**](#wireframe-mockup-sizing)

[**Website Components Styling**](#website-components-styling)

[**Language Model**](#language-model)

\
&nbsp;

## **Font**

Font-Family: `Poppins`

Font-Weight: 200 (ExtraLight), 300 (Light), 400 (Regular), 600 (SemiBold), 800 (ExtraBold)

Font-Styles:	 Poppins ExtraBold, Poppins SemiBold, Poppins Regular, Poppins Light, Poppins ExtraLight

&nbsp;

### **Example of the font styles usage:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.003.png)

Sneak-peek: Theme pack Moderna Light

\
&nbsp;

## **Font Sizes**
11, 12, 14, 16, 18, 20, 24, 28

All the font sizes that should be used in the Dashboard. From small (11px) for the chart tooltip text to really big (28px) for catchy KPI-Values or project headings. Default font size is going to be 14px and some more text information will be 12px. 18px for the subheading and 24px for the heading. Normal Values will be 24px. 14px for the header Username and 12px for the search field. Nav text will also be 14px.

&nbsp;

**Font size upscaling could be possible in the future!**

&nbsp;

|Text|Font Size|
| :- | :- |
|Test|28px|
|Test|24px|
|Test|20px|
|Test|18px|
|Test|16px|
|Test|14px|
|Test|12px|
|Test|11px|

\
&nbsp;

## **Color Themes**
The definition of the color packs is currently not fully completed, some accent colors are the same. **Changes will be made soon!**

### **Colors that are always the same, never mind which theme pack:**

```css
--nl-clr-3: hsl(0, 0%, 100%);

--nl-clr-4: hsl(0, 0%, 0%);
```

\
&nbsp;

---

### **Theme Pack 1 (Moderna Light)**

```css
--ac-clr-1: hsl(233, 64%, 66%);

--ac-clr-2: hsl(355, 100%, 74%);

--ac-clr-3: hsl(161, 85%, 60%);

--pr-clr: hsl(235, 10%, 26%);

--sc-clr: hsl(240, 1%, 32%);

--nl-clr-1: hsl(270, 4%, 90%);

--nl-clr-2: hsl(0, 0%, 100%);

--drp-shadow: 0 2rem 3rem hsl(230, 26%, 89%);
```

&nbsp;

#### **Preview:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.004.png)

---

\
&nbsp;

### **Theme Pack 2 (Moderna Dark)**

```css
--ac-clr-1: hsl(233, 64%, 66%);

--ac-clr-2: hsl(355, 100%, 74%);

--ac-clr-3: hsl(161, 85%, 60%);

--pr-clr: hsl(216, 21%, 91%);

--sc-clr: hsl(220, 12%, 90%);

--nl-clr-1: hsl(216, 11%, 9%);

--nl-clr-2: hsl(202, 11%, 14%);

--drp-shadow: 0 2rem 3rem hsl(228, 14%, 7%);
```

&nbsp;

#### **Preview:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.005.png)

---

\
&nbsp;

### **Theme Pack 3 (Syphus)**

```css
--ac-clr-1: hsl(345, 100%, 60%);

--ac-clr-2: hsl(355, 100%, 74%);

--ac-clr-3: hsl(161, 85%, 60%);

--pr-clr: hsl(0, 0%, 89%);

--sc-clr: hsl(0, 0%, 78%);

--nl-clr-1: hsl(0, 0%, 3%);

--nl-clr-2: hsl(0, 0%, 6%);

--drp-shadow: 0 2rem 3rem hsl(0, 0%, 0%);
```

&nbsp;

#### **Preview:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.006.png)

---

\
&nbsp;

### **Theme Pack 4 (Midas)**

```css
--ac-clr-1: hsl(34, 45%, 50%);

--ac-clr-2: hsl(355, 100%, 74%);

--ac-clr-3: hsl(161, 85%, 60%);

--pr-clr: hsl(216, 21%, 91%);

--sc-clr: hsl(220, 12%, 90%);

--nl-clr-1: hsl(0, 0%, 6%);

--nl-clr-2: hsl(0, 0%, 10%);

--drp-shadow: 0 2rem 3rem hsl(0, 0%, 4%);
```

&nbsp;

#### **Preview:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.007.png)

---

\
&nbsp;

### **Theme Pack 5 (Clean Red)**

```css
--ac-clr-1: hsl(342, 99%, 45%);

--ac-clr-2: hsl(355, 100%, 74%);

--ac-clr-3: hsl(161, 85%, 60%);

--pr-clr: hsl(229, 18%, 30%);

--sc-clr: hsl(0, 0%, 27%);

--nl-clr-1: hsl(0, 0%, 100%);

--nl-clr-2: hsl(240, 67%, 96%);

--drp-shadow: 0 2rem 3rem hsl(240, 11%, 89%);
```

&nbsp;

#### **Preview:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.008.png)

---

\
&nbsp;

### **Theme Pack 6 (Discord)**

```css
--ac-clr-1: hsl(235, 86%, 65%);

--ac-clr-2: hsl(359, 67%, 54%);

--ac-clr-3: hsl(139, 52%, 52%);

--pr-clr: hsl(0, 0%, 100%);

--sc-clr: hsl(216, 4%, 74%);

--nl-clr-1: hsl(216, 7%, 14%);

--nl-clr-2: hsl(223, 7%, 20%);

--drp-shadow: 0 2rem 3rem hsl(216, 7%, 12%);
```

&nbsp;

#### **Preview:**

![](ressources\Aspose.Words.250e5450-5055-47c2-bdb9-e05fa0d0294b.009.png)

---

\
&nbsp;

## **Wireframe Mockup Sizing**
The default width of the website will be 1440px because most of the users out there use 1920px in these days and upscaling is often not a good idea. Downscaling is therefore no problem – just change the placement of some containers.

What’s about the height? The height never matters when we’re talking about websites in general, the user has the ability to scroll down – mind-blowing I know.

\
&nbsp;

## **Website Components Styling**
All the components on the website should look like that they’re from 2022 and not from 2014, where everything was like a rectangle without any kickoff moments. So, the components must have a border radius, shadow, and look like they are flying.

In every case the whole website must have a consistent style – inconsistency is always the time breaker.

\
&nbsp;

## **Language Model**
The user should be able to toggle between English and German, this will change the entire dashboard language.