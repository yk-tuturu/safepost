# SafePost 📱🔒

SafePost is a privacy-first React Native application that detects Personally Identifiable Information (PII) in images and text before sharing. The entire pipeline runs **locally on-device**, ensuring user data never leaves the device.

## 🚀 Features

* **On-device PII Detection**

  * Lightweight **object detection** (MobileNetV3) flags sensitive regions in uploaded images.
  * **OCR (Executorch)** extracts text from images.
  * **LLM (SmolLM2)** checks user captions and OCR-extracted text for PII.

* **Seamless User Experience**

  * While typing a caption, the image processing pipeline runs in the background to reduce latency.

* **Privacy by Design**

  * **AI for Privacy**: Protects users by scanning for PII.
  * **Privacy of AI**: Runs models locally (no cloud API calls).
  * Models are downloaded once from HuggingFace and then cached for offline use.

---

## 🛠️ Tech Stack

### Development Tools

* **Android Studio** – Native development & debugging
* **Git** – Version control
* **Node.js** – Runtime for React Native & Metro bundler
* **Metro Bundler** – JavaScript bundler for React Native

### APIs

* [HuggingFace](https://huggingface.co/) – Model hosting and distribution

### Assets (Models)

* **MobileNetV3** – Lightweight object detection
* **Executorch OCR model** – On-device text recognition
* **SmolLM2** – Lightweight LLM for PII detection in text

### Core Libraries

* **expo** – Core Expo SDK
* **expo-font** – Custom font loading
* **expo-router** – File-based routing
* **expo-status-bar** – Status bar management
* **react / react-native** – Core React stack
* **react-native-reanimated** – Animations
* **react-native-safe-area-context** – Safe area handling
* **@react-navigation/native** – Navigation support
* **@expo/vector-icons** – Icon support
* **react-native-paper** – UI components

### Other Expo SDKs

* `expo-haptics`, `expo-image`, `expo-image-picker`,
* `expo-linear-gradient`, `expo-linking`, `expo-splash-screen`,
* `expo-system-ui`, `expo-web-browser`, `expo-media-library`

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yk-tuturu/safepost.git
cd safepost
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run on Android

```bash
npx expo run:android
```

Alternatively, you can download the apk from [expo](https://expo.dev/accounts/yihao03/projects/tiktok-hackathon/builds/6f77665d-7aa7-4b9b-947c-3a498a2cf009) onto an android device and start the app from expo using 
```bash   
npx expo start
```


### 4. Run on iOS (if applicable)

```bash
npx expo run:ios
```
