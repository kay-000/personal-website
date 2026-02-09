import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css?family=Open+Sans"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const ip_addr = "http://172.20.10.6/";
function handleLogout(navigate) {
  localStorage.removeItem("loggedInUser");
  navigate("/");
}
function MotivationalQuotes() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const fetchQuote = () => {
    const script = document.createElement("script");
    const callbackName = `jsonp_callback_${Math.round(1e5 * Math.random())}`;
    const windowWithCallbacks = window;
    windowWithCallbacks[callbackName] = function(data) {
      setQuote(data.quoteText);
      setAuthor(data.quoteAuthor || "Unknown");
      document.body.removeChild(script);
      delete windowWithCallbacks[callbackName];
    };
    script.src = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=${callbackName}`;
    script.onerror = () => {
      setQuote("Failed to load quote. Try again!");
      document.body.removeChild(script);
      delete windowWithCallbacks[callbackName];
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  useEffect(() => {
    const fiveMinsInMilliseconds = 5 * 60 * 1e3;
    const interval = setInterval(() => {
      fetchQuote();
    }, fiveMinsInMilliseconds);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "mainpage-components", id: "speech-bubble", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      '"',
      quote,
      '"'
    ] }),
    /* @__PURE__ */ jsxs("span", { children: [
      " - ",
      author
    ] })
  ] });
}
function ToggleButton({ endpoint, isConnected, onStateChange }) {
  const [isOn, setIsOn] = useState(false);
  const handleToggle = async () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onStateChange) {
      onStateChange(newState);
    }
    if (isConnected) {
      try {
        console.log(`Sending ... ${ip_addr}${endpoint} { on: ${newState} }`);
        await axios.post(`${ip_addr}${endpoint}`, { on: newState });
      } catch (error) {
        console.error("Failed to send toggle:", error);
      }
    }
  };
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        axios.get(`${ip_addr}`).then((res) => {
          var _a;
          const serverState = (_a = res.data) == null ? void 0 : _a[endpoint];
          if (typeof serverState === "boolean" && serverState !== isOn) {
            setIsOn(serverState);
          }
        }).catch((err) => {
          console.error("Polling failed", err);
        });
      }, 2e3);
      return () => clearInterval(interval);
    }
  }, [isOn]);
  return /* @__PURE__ */ jsxs("label", { className: "switch", children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: isOn, onChange: handleToggle }),
    /* @__PURE__ */ jsx("span", { className: "slider" })
  ] });
}
function FidgetStudyModeToggle({ isConnected }) {
  return /* @__PURE__ */ jsxs("div", { id: "fidget-study-toggle", className: "mainpage-components", children: [
    "Study Mode",
    /* @__PURE__ */ jsx(ToggleButton, { endpoint: "study_mode", isConnected }),
    "Fidget Mode"
  ] });
}
const ShowBulb = ({ isLedOn }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("input", { id: "bulb-checkbox-input", type: "checkbox", checked: isLedOn, readOnly: true }),
    /* @__PURE__ */ jsx("label", { className: "bulb-switch", htmlFor: "bulb-checkbox-input", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        xmlSpace: "preserve",
        style: { height: "3em" },
        viewBox: "0 0 128 128",
        height: "3em",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M77.547 120.684h-5.765l-1.698 3.012a7.477 7.477 0 0 1-6.513 3.804h-.003a7.479 7.479 0 0 1-6.513-3.804l-1.698-3.012h-5.765v-4.06h27.956v4.06z",
              style: { fill: "#51514c" }
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M77.547 113.65H49.591v-4.279h27.956v4.279zm0-11.711H49.591v4.279h27.956v-4.279zm38.587-32.576-12.209-3.271.92-3.434 12.209 3.271-.92 3.434zm-104.268 0-.92-3.434 12.209-3.271.92 3.434-12.209 3.271zm92.979-24.913-.92-3.434 12.209-3.272.92 3.434-12.209 3.272zm-81.69 0-12.209-3.272.92-3.434 12.209 3.272-.92 3.434zM94.82 25.247l-2.514-2.514 8.938-8.938 2.514 2.514-8.938 8.938zm-61.64 0-8.937-8.938 2.514-2.514 8.937 8.938-2.514 2.514zm43.358-11.618-3.434-.92L76.376.5l3.434.92-3.272 12.209zm-25.076 0L48.191 1.42 51.625.5l3.272 12.209-3.435.92z",
              style: { fill: "#a7a79b" }
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M59.802 64.141h7.535v34.934h-7.535V64.141zm3.767-44.754c-18.485-.53-33.631 14.817-33.631 33.824 0 9.781 4.016 18.581 10.431 24.753 5.637 5.423 9.222 13.147 9.222 21.111h7.84V64.141H51.75c-4.44 0-8.051-3.612-8.051-8.051s3.612-8.051 8.051-8.051 8.052 3.612 8.052 8.051v5.681h7.535V56.09c0-4.44 3.612-8.051 8.052-8.051 4.44 0 8.051 3.612 8.051 8.051s-3.612 8.051-8.051 8.051h-5.682v34.934h7.84c0-7.964 3.584-15.688 9.222-21.111C93.184 71.792 97.2 62.992 97.2 53.211c0-19.008-15.146-34.355-33.631-33.824zM51.75 50.408a5.687 5.687 0 0 0-5.681 5.681 5.687 5.687 0 0 0 5.681 5.681h5.682v-5.681a5.688 5.688 0 0 0-5.682-5.681zM75.389 61.77h-5.682v-5.681a5.688 5.688 0 0 1 5.682-5.681 5.687 5.687 0 0 1 5.681 5.681 5.687 5.687 0 0 1-5.681 5.681z",
              style: { fill: "#ffffff" }
            }
          )
        ]
      }
    ) })
  ] });
};
function LEDControl({ isConnected }) {
  const [isLedOn, setIsLedOn] = useState(false);
  return /* @__PURE__ */ jsxs("div", { id: "led-div", className: "mainpage-components", children: [
    /* @__PURE__ */ jsx("h3", { children: " LED " }),
    /* @__PURE__ */ jsx(ShowBulb, { isLedOn }),
    /* @__PURE__ */ jsxs("div", { id: "LED-toggle", children: [
      "On ",
      /* @__PURE__ */ jsx(
        ToggleButton,
        {
          endpoint: "led",
          isConnected,
          onStateChange: setIsLedOn
        }
      ),
      " Off"
    ] })
  ] });
}
function Timer({ studyHours, setStudyHours }) {
  const [defaultTimeMins, setDefaultTimeMins] = useState(20);
  const [timeLeft, setTimeLeft] = useState(defaultTimeMins * 60);
  const [timerState, setTimerState] = useState("selecting");
  const [textTime, setTextTime] = useState(defaultTimeMins * 60);
  const [timeRecorded, setTimeRecorded] = useState(false);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const totalTimeSeconds = defaultTimeMins * 60;
  const hasStarted = timerState === "running" || timerState === "paused";
  const secondsToShow = hasStarted ? timeLeft : defaultTimeMins * 60;
  const clamped = hasStarted ? Math.max(0, Math.min(timeLeft, totalTimeSeconds)) : totalTimeSeconds;
  const progress = clamped / totalTimeSeconds * circumference;
  const updateStudyHours = (timeStudied) => {
    if (!timeRecorded && timeStudied >= 0) {
      const date = /* @__PURE__ */ new Date();
      const day = date.getDay();
      const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const dayName = dayNames[day];
      const newStudyHours = { ...studyHours };
      newStudyHours[dayName] += timeStudied / 60;
      setStudyHours(newStudyHours);
      const currentUsername = localStorage.getItem("loggedInUser");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u) => u.username === currentUsername);
      if (userIndex !== -1) {
        users[userIndex].studyHours = newStudyHours;
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Saved study hours:", timeStudied / 60);
      }
      setTimeRecorded(true);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${ip_addr}`).then((res) => {
        const data = res.data;
        if (typeof data.default_time_mins === "number") {
          setDefaultTimeMins(data.default_time_mins);
        }
        if (typeof data.timer_state === "string") {
          setTimerState(data.timer_state);
        }
        if (typeof data.time_left === "number" && (data.timer_state === "running" || data.timer_state === "paused")) {
          setTimeLeft(data.time_left);
          setTextTime(data.time_left);
        } else if (data.timer_state === "selecting" || data.timer_state === "confirmed") {
          setTimeLeft(0);
          setTextTime(0);
          setTimeRecorded(false);
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (timerState === "running" && timeLeft <= 1 && timeLeft !== defaultTimeMins * 60) {
      console.log("Timer completed naturally!");
      const timeStudied = defaultTimeMins;
      updateStudyHours(timeStudied);
    }
  }, [timeLeft, timerState]);
  const handleStart = async () => {
    setTimeRecorded(false);
    try {
      console.log(`Sending ... ${ip_addr}timer, { action: "start" }`);
      await axios.post(`${ip_addr}timer`, { action: "start" });
    } catch (err) {
      console.error("Failed to send start command", err);
    }
  };
  const handlePause = async () => {
    try {
      console.log(`Sending ... ${ip_addr}timer, { action: "pause" }`);
      await axios.post(`${ip_addr}timer`, { action: "pause" });
    } catch (err) {
      console.error("Failed to send start command", err);
    }
  };
  const handlePlay = async () => {
    try {
      console.log(`Sending ... ${ip_addr}timer, { action: "resume" }`);
      await axios.post(`${ip_addr}timer`, { action: "resume" });
    } catch (err) {
      console.error("Failed to send start command", err);
    }
  };
  const handleStop = async () => {
    try {
      console.log(`Sending ... ${ip_addr}timer, { action: "stop" }`);
      await axios.post(`${ip_addr}timer`, { action: "stop" });
    } catch (err) {
      console.error("Failed to send start command", err);
    }
    if (!timeRecorded) {
      let timeStudied;
      if (timeLeft <= 1) {
        timeStudied = defaultTimeMins;
      } else if (timeLeft <= defaultTimeMins * 60) {
        timeStudied = defaultTimeMins - timeLeft / 60;
      } else {
        console.warn("Invalid timeLeft value:", timeLeft);
        return;
      }
      console.log("Time studied:", timeStudied, "minutes");
      updateStudyHours(timeStudied);
    }
  };
  return /* @__PURE__ */ jsxs("div", { id: "timer-div", className: "mainpage-components", children: [
    /* @__PURE__ */ jsxs("div", { className: "comp-header", children: [
      /* @__PURE__ */ jsxs("svg", { width: "35", height: "35", viewBox: "0 0 61 61", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "30.4993", cy: "35.5833", r: "20.3333", stroke: "#222222", strokeWidth: "2.54167" }),
        /* @__PURE__ */ jsx("path", { d: "M30.5 35.5834L30.5 27.9584", stroke: "#222222", strokeWidth: "2.54167", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M44.4785 19.0625L48.291 15.25", stroke: "#222222", strokeWidth: "2.54167", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M25.5905 6.02529C25.8802 5.75507 26.5183 5.51629 27.4061 5.34599C28.2939 5.17568 29.3816 5.08337 30.5007 5.08337C31.6197 5.08337 32.7074 5.17568 33.5952 5.34599C34.483 5.51629 35.1212 5.75507 35.4108 6.02529", stroke: "#222222", strokeWidth: "2.54167", strokeLinecap: "round" })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: " Timer" })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "timer-progress", children: /* @__PURE__ */ jsxs("svg", { width: "30vh", height: "auto", viewBox: "0 0 200 200", children: [
      /* @__PURE__ */ jsx("circle", { cx: "100", cy: "100", r: radius, stroke: "#DCE1FF", strokeWidth: "20", fill: "none" }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "100",
          cy: "100",
          r: radius,
          stroke: "#7380B2",
          strokeWidth: "20",
          fill: "none",
          strokeDasharray: circumference,
          strokeDashoffset: circumference - progress,
          strokeLinecap: "round",
          transform: "rotate(-90 100 100)"
        }
      ),
      /* @__PURE__ */ jsxs("text", { x: "100", y: "110", textAnchor: "middle", fontSize: "24px", fill: "#7380B2", fontWeight: "bold", children: [
        Math.floor(secondsToShow / 60),
        ":",
        String(secondsToShow % 60).padStart(2, "0")
      ] })
    ] }) }),
    timerState === "selecting" && /* @__PURE__ */ jsx("button", { id: "start-btn", onClick: handleStart, children: "Start" }),
    (timerState === "running" || timerState === "paused") && /* @__PURE__ */ jsxs("div", { className: "button-container", children: [
      timerState === "running" ? /* @__PURE__ */ jsx("button", { onClick: handlePause, children: "Pause" }) : /* @__PURE__ */ jsx("button", { onClick: handlePlay, children: "Play" }),
      /* @__PURE__ */ jsx("button", { onClick: handleStop, children: "Stop" })
    ] })
  ] });
}
function BackupTimer({ studyHours, setStudyHours }) {
  const default_time_mins = 20;
  const [timeLeft, setTimeLeft] = useState(default_time_mins * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pressedStart, setPressedStart] = useState(false);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / (default_time_mins * 60) * circumference;
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [isRunning]);
  const handleStart = () => {
    setIsRunning(true);
    setPressedStart(true);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handlePlay = () => {
    setIsRunning(true);
  };
  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(default_time_mins * 60);
    setPressedStart(false);
    const timeStudied = default_time_mins - timeLeft / 60;
    if (timeStudied >= 5) {
      const date = /* @__PURE__ */ new Date();
      const day = date.getDay();
      const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const dayName = dayNames[day];
      const newStudyHours = { ...studyHours };
      newStudyHours[dayName] += timeStudied / 60;
      setStudyHours(newStudyHours);
    }
  };
  return /* @__PURE__ */ jsxs("div", { id: "timer-div", className: "mainpage-components", children: [
    /* @__PURE__ */ jsxs("div", { className: "comp-header", children: [
      /* @__PURE__ */ jsxs("svg", { width: "35", height: "35", viewBox: "0 0 61 61", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "30.4993", cy: "35.5833", r: "20.3333", stroke: "#222222", "stroke-width": "2.54167" }),
        /* @__PURE__ */ jsx("path", { d: "M30.5 35.5834L30.5 27.9584", stroke: "#222222", "stroke-width": "2.54167", "stroke-linecap": "round" }),
        /* @__PURE__ */ jsx("path", { d: "M44.4785 19.0625L48.291 15.25", stroke: "#222222", "stroke-width": "2.54167", "stroke-linecap": "round" }),
        /* @__PURE__ */ jsx("path", { d: "M25.5905 6.02529C25.8802 5.75507 26.5183 5.51629 27.4061 5.34599C28.2939 5.17568 29.3816 5.08337 30.5007 5.08337C31.6197 5.08337 32.7074 5.17568 33.5952 5.34599C34.483 5.51629 35.1212 5.75507 35.4108 6.02529", stroke: "#222222", "stroke-width": "2.54167", "stroke-linecap": "round" })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: " Timer" })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "timer-progress", children: /* @__PURE__ */ jsxs("svg", { width: "30vh", height: "auto", viewBox: "0 0 200 200", children: [
      /* @__PURE__ */ jsx("circle", { cx: "100", cy: "100", r: radius, stroke: "#DCE1FF", strokeWidth: "20", fill: "none" }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "100",
          cy: "100",
          r: radius,
          stroke: "#7380B2",
          strokeWidth: "20",
          fill: "none",
          strokeDasharray: circumference,
          strokeDashoffset: circumference - progress,
          strokeLinecap: "round",
          transform: "rotate(-90 100 100)"
        }
      ),
      /* @__PURE__ */ jsxs("text", { x: "100", y: "110", textAnchor: "middle", fontSize: "24px", fill: "#7380B2", fontWeight: "bold", children: [
        Math.floor(timeLeft / 60),
        ":",
        String(timeLeft % 60).padStart(2, "0")
      ] })
    ] }) }),
    !pressedStart && /* @__PURE__ */ jsx("div", { className: "button-container", children: /* @__PURE__ */ jsx("button", { id: "start-btn", onClick: handleStart, children: "Start" }) }),
    pressedStart && /* @__PURE__ */ jsxs("div", { className: "button-container", children: [
      isRunning ? /* @__PURE__ */ jsx("button", { id: "pause-btn", onClick: handlePause, children: " Pause " }) : /* @__PURE__ */ jsx("button", { id: "play-btn", onClick: handlePlay, children: " Play " }),
      /* @__PURE__ */ jsx("button", { id: "stop-btn", onClick: handleStop, children: " Stop " })
    ] })
  ] });
}
function SoundSelectionDropdown({ audioRef, isPlaying }) {
  const [selectedSound, setSelectedSound] = useState("Rain");
  const soundOptions = ["Rain", "Zen Garden", "Waves", "444 Hz", "Snowfall"];
  const handleSelect = (soundName) => {
    setSelectedSound(soundName);
    const soundMap = {
      "Rain": "/audios/rain.mp3",
      "Zen Garden": "/audios/zen_garden.mp3",
      "Waves": "/audios/waves.mp3",
      "444 Hz": "/audios/444_hz.mp3",
      "Snowfall": "/audios/snowfall.mp3"
    };
    if (audioRef.current) {
      console.log("soundMap[soundName]: ", soundMap[soundName]);
      audioRef.current.src = soundMap[soundName];
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };
  return /* @__PURE__ */ jsxs(Dropdown, { children: [
    /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "secondary", id: "dropdown-basic", children: selectedSound }),
    /* @__PURE__ */ jsx(Dropdown.Menu, { children: soundOptions.map((sound) => /* @__PURE__ */ jsx(
      Dropdown.Item,
      {
        onClick: () => handleSelect(sound),
        active: sound === selectedSound,
        children: sound
      },
      sound
    )) })
  ] });
}
function Sounds() {
  const default_volume_level = 30;
  const [volume, setVolume] = useState(default_volume_level);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderBgRef = useRef(null);
  const isDragging = useRef(false);
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "/audios/rain.mp3";
      audioRef.current.load();
    }
  }, []);
  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateVolumeFromPointer(e);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    if (isDragging.current) {
      updateVolumeFromPointer(e);
    }
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const updateVolumeFromPointer = async (e) => {
    if (sliderBgRef.current !== null) {
      const rect = sliderBgRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newVolume = Math.max(0, Math.min(100, offsetX / rect.width * 100));
      setVolume(newVolume);
      try {
        await axios.post(`${ip_addr}volume`, { value: newVolume });
      } catch (err) {
        console.error("Failed to send volume", err);
      }
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0;
    }
  };
  const handlePlay = () => {
    console.log("Play button clicked");
    console.log("Audio ref:", audioRef.current);
    if (audioRef.current) {
      if (!isPaused) {
        audioRef.current.load();
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsPaused(false);
      }).catch((err) => console.error("Playback failed:", err));
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { id: "sounds", className: "mainpage-components", children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef, loop: true }),
    /* @__PURE__ */ jsxs("div", { className: "comp-header", children: [
      /* @__PURE__ */ jsx("div", { onClick: toggleMute, style: { cursor: "pointer" }, children: isMuted ? (
        /* Sound Muted Icon */
        /* @__PURE__ */ jsxs("svg", { width: "35", height: "35", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("path", { d: "M3.15838 13.9306C2.44537 12.7423 2.44537 11.2577 3.15838 10.0694V10.0694C3.37596 9.70674 3.73641 9.45272 4.1511 9.36978L5.84413 9.03117C5.94499 9.011 6.03591 8.95691 6.10176 8.87788L8.17085 6.39498C9.3534 4.97592 9.94468 4.26638 10.4723 4.45742C11 4.64846 11 5.57207 11 7.41928L11 16.5807C11 18.4279 11 19.3515 10.4723 19.5426C9.94468 19.7336 9.3534 19.0241 8.17085 17.605L6.10176 15.1221C6.03591 15.0431 5.94499 14.989 5.84413 14.9688L4.1511 14.6302C3.73641 14.5473 3.37596 14.2933 3.15838 13.9306V13.9306Z", stroke: "#222222" }),
          /* @__PURE__ */ jsx("path", { d: "M15 15L21 9", stroke: "#222222", "stroke-linecap": "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 15L15 9", stroke: "#222222", "stroke-linecap": "round" })
        ] })
      ) : (
        /* Sound Playing Icon */
        /* @__PURE__ */ jsxs("svg", { width: "35", height: "35", viewBox: "0 0 61 61", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("path", { d: "M8.02722 35.4068C6.215 32.3864 6.215 28.6131 8.02722 25.5927V25.5927C8.58023 24.671 9.49639 24.0254 10.5504 23.8146L14.8535 22.954C14.9029 22.9441 14.9276 22.9392 14.9514 22.9332C15.1404 22.8856 15.3114 22.7839 15.4433 22.6405C15.4599 22.6224 15.4761 22.6031 15.5083 22.5644L25.1289 11.0197C26.3114 9.60067 26.9027 8.89114 27.4303 9.08218C27.958 9.27322 27.958 10.1968 27.958 12.044L27.958 48.9555C27.958 50.8027 27.958 51.7263 27.4303 51.9173C26.9027 52.1084 26.3114 51.3988 25.1289 49.9798L15.5083 38.4351C15.4761 38.3964 15.4599 38.3771 15.4433 38.359C15.3114 38.2156 15.1404 38.1139 14.9514 38.0663C14.9276 38.0603 14.9029 38.0554 14.8535 38.0455L10.5504 37.1849C9.49639 36.9741 8.58023 36.3285 8.02722 35.4068V35.4068Z", stroke: "#222222", strokeWidth: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M39.4865 21.5136C41.8575 23.8846 43.1954 27.0966 43.2086 30.4497C43.2218 33.8028 41.9093 37.0252 39.557 39.4148", stroke: "#222222", strokeWidth: "2", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M49.9612 16.1219C53.7548 19.9155 55.8954 25.0547 55.9165 30.4196C55.9376 35.7846 53.8376 40.9405 50.074 44.7639", stroke: "#222222", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ) }),
      /* @__PURE__ */ jsx("h3", { children: " Sounds " })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "volume-slider-bg", ref: sliderBgRef, onMouseDown: handleMouseDown, children: /* @__PURE__ */ jsx("div", { id: "volume-slider", style: { width: `${volume}%` } }) }),
    /* @__PURE__ */ jsxs("div", { id: "volume-display", children: [
      Math.round(volume),
      "%"
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "selectAndBtns", children: [
      /* @__PURE__ */ jsx(SoundSelectionDropdown, { audioRef, isPlaying }),
      /* @__PURE__ */ jsx("div", { className: "button-container", children: isPlaying ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { id: "pause-btn", onClick: handlePause, children: " Pause " }),
        /* @__PURE__ */ jsx("button", { id: "stop-btn", onClick: handleStop, children: " Stop " })
      ] }) : isPaused ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { id: "play-btn", onClick: handlePlay, children: " Resume " }),
        /* @__PURE__ */ jsx("button", { id: "stop-btn", onClick: handleStop, children: " Stop " })
      ] }) : /* @__PURE__ */ jsx("button", { id: "play-btn", onClick: handlePlay, children: " Play " }) })
    ] })
  ] });
}
function StudyTracker({ studyHours, setStudyHours }) {
  const maxHours = 12;
  const [weekOffset, setWeekOffset] = useState(0);
  const [studyHistory, setStudyHistory] = useState({});
  const [displayedHours, setDisplayedHours] = useState(studyHours);
  const getWeekDates = (offset) => {
    const today = /* @__PURE__ */ new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + mondayOffset);
    const targetMonday = new Date(currentMonday);
    targetMonday.setDate(currentMonday.getDate() + offset * 7);
    const targetSunday = new Date(targetMonday);
    targetSunday.setDate(targetMonday.getDate() + 6);
    return {
      start: targetMonday,
      end: targetSunday,
      key: `week-${targetMonday.toISOString().slice(0, 10)}`
      // using Monday's date as the key
    };
  };
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  const goToPreviousWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };
  const goToNextWeek = () => {
    if (weekOffset < 0) {
      setWeekOffset((prev) => prev + 1);
    }
  };
  const goToCurrentWeek = () => {
    setWeekOffset(0);
  };
  useEffect(() => {
    const currentUsername = localStorage.getItem("loggedInUser");
    if (!currentUsername) return;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.username === currentUsername);
    if (user) {
      if (user.studyHistory) {
        setStudyHistory(user.studyHistory);
      } else {
        const { key } = getWeekDates(0);
        const initialHistory = {
          [key]: { ...studyHours }
        };
        setStudyHistory(initialHistory);
        user.studyHistory = initialHistory;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  }, []);
  useEffect(() => {
    if (weekOffset === 0) {
      setDisplayedHours(studyHours);
    } else {
      const { key } = getWeekDates(weekOffset);
      const weekData = studyHistory[key];
      if (weekData) {
        setDisplayedHours(weekData);
      } else {
        setDisplayedHours({
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0
        });
      }
    }
  }, [weekOffset, studyHistory, studyHours]);
  useEffect(() => {
    if (weekOffset === 0) {
      const currentUsername = localStorage.getItem("loggedInUser");
      if (!currentUsername) return;
      const { key } = getWeekDates(0);
      const newHistory = {
        ...studyHistory,
        [key]: { ...studyHours }
      };
      setStudyHistory(newHistory);
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((u) => u.username === currentUsername);
      if (userIndex !== -1) {
        users[userIndex].studyHistory = newHistory;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  }, [studyHours]);
  const { start, end } = getWeekDates(weekOffset);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "comp-header", children: [
      /* @__PURE__ */ jsx("h3", { children: " Study Tracker " }),
      /* @__PURE__ */ jsx("span", { className: "week-range", children: /* @__PURE__ */ jsxs("p", { children: [
        formatDate(start),
        " - ",
        formatDate(end)
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bar-chart", children: [
      /* @__PURE__ */ jsx("button", { onClick: goToPreviousWeek, className: "nav-btn", children: "←" }),
      Object.entries(displayedHours).map(([day, hours]) => /* @__PURE__ */ jsxs("div", { className: "day-div", children: [
        /* @__PURE__ */ jsx("div", { className: "bar-bg" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "study-hours",
            style: { height: `${hours / maxHours * 500}%` },
            children: /* @__PURE__ */ jsx("span", { className: "hours-label", children: hours < 1 ? `${Math.round(hours * 60)}m` : hours % 1 === 0 ? `${Math.floor(hours)}h` : `${Math.floor(hours)}h ${Math.round(hours % 1 * 60)}m` })
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "day-label", children: day.toUpperCase() })
      ] }, day)),
      /* @__PURE__ */ jsx("button", { onClick: goToNextWeek, className: "nav-btn", disabled: weekOffset === 0, children: "→" })
    ] }),
    weekOffset !== 0 && /* @__PURE__ */ jsx("button", { onClick: goToCurrentWeek, className: "current-week-btn", children: "Current Week" })
  ] });
}
const main = UNSAFE_withComponentProps(function Main() {
  const navigate = useNavigate();
  const [dailyStudyHours, setDailyStudyHours] = useState({
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0
  });
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);
  useEffect(() => {
    const currentUsername = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.username === currentUsername);
    if (user && user.studyHours) {
      setDailyStudyHours(user.studyHours);
    }
  }, []);
  useEffect(() => {
    const currentUsername = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.username === currentUsername);
    if (userIndex !== -1) {
      users[userIndex].studyHours = dailyStudyHours;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [dailyStudyHours]);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${ip_addr}`).then((res) => {
        if (res.ok) {
          setConnectionStatus(true);
        } else {
          setConnectionStatus(false);
        }
      }).catch(() => setConnectionStatus(false));
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("nav", {
      className: "navbar",
      children: [/* @__PURE__ */ jsxs(Link, {
        to: "/settings",
        children: [" ", username]
      }), " |", /* @__PURE__ */ jsx("button", {
        onClick: () => handleLogout(navigate),
        children: "Logout"
      })]
    }), /* @__PURE__ */ jsx("h1", {
      className: "bearbot-header",
      children: " Study BearBot"
    }), /* @__PURE__ */ jsxs("div", {
      id: "outerDiv",
      children: [/* @__PURE__ */ jsxs("div", {
        id: "container4",
        children: [/* @__PURE__ */ jsxs("div", {
          id: "container1",
          children: [/* @__PURE__ */ jsx("img", {
            id: "bearbot-img",
            src: "app/assets/imgs/bearbot.png",
            alt: "3D rendering of bearbot"
          }), /* @__PURE__ */ jsx(MotivationalQuotes, {})]
        }), /* @__PURE__ */ jsxs("div", {
          id: "container2",
          children: [/* @__PURE__ */ jsx("div", {
            id: "left-container",
            children: /* @__PURE__ */ jsx(Sounds, {})
          }), /* @__PURE__ */ jsxs("div", {
            id: "right-container",
            children: [/* @__PURE__ */ jsx(FidgetStudyModeToggle, {
              isConnected: connectionStatus
            }), /* @__PURE__ */ jsx(LEDControl, {
              isConnected: connectionStatus
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        id: "container3",
        children: [connectionStatus ? /* @__PURE__ */ jsx(Timer, {
          studyHours: dailyStudyHours,
          setStudyHours: setDailyStudyHours
        }) : /* @__PURE__ */ jsx(BackupTimer, {
          studyHours: dailyStudyHours,
          setStudyHours: setDailyStudyHours
        }), /* @__PURE__ */ jsx("div", {
          id: "study-tracker",
          className: "mainpage-components",
          children: /* @__PURE__ */ jsx(StudyTracker, {
            studyHours: dailyStudyHours,
            setStudyHours: setDailyStudyHours
          })
        })]
      })]
    }), /* @__PURE__ */ jsx("footer", {
      children: /* @__PURE__ */ jsxs("div", {
        id: "connection-wrapper",
        children: [/* @__PURE__ */ jsx("span", {
          id: "connection-status",
          style: {
            backgroundColor: `${connectionStatus ? "#9BF2B5" : "red"}`
          }
        }), "Connection Status"]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: main
}, Symbol.toStringTag, { value: "Module" }));
function About() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("nav", {
      className: "navbar",
      children: /* @__PURE__ */ jsx(Link, {
        to: "/login",
        id: "login ",
        children: "Login "
      })
    }), /* @__PURE__ */ jsx("h1", {
      className: "bearbot-header",
      children: " Study BearBot"
    }), /* @__PURE__ */ jsxs("div", {
      id: "bearbot-info",
      children: [/* @__PURE__ */ jsxs("div", {
        id: "bearbot-description",
        children: [/* @__PURE__ */ jsxs("p", {
          children: ["Studying is a ", /* @__PURE__ */ jsx("em", {
            children: "stressful"
          }), " endeavor. ", /* @__PURE__ */ jsx("br", {}), "Whether it's for a final exam at university or for a weekly quiz in middle school, everyone needs a short break every now and then.  ", /* @__PURE__ */ jsx("br", {}), "For those who get stressed out easily and have shorter attention spans, what better way to take your mind off of learning briefly than a friend waiting to comfort you?  ", /* @__PURE__ */ jsx("br", {}), "We aim to create a ", /* @__PURE__ */ jsx("b", {
            children: "StudyBuddy"
          }), " robot that serves as an interactive desktop companion designed to alleviate stress while keeping users engaged in their study space.  ", /* @__PURE__ */ jsx("br", {}), "This study robot will have", /* @__PURE__ */ jsxs("ul", {
            children: [/* @__PURE__ */ jsx("li", {
              children: " reactive sensors "
            }), /* @__PURE__ */ jsx("li", {
              children: " fidget device components"
            }), /* @__PURE__ */ jsx("li", {
              children: " a soft squeezable exterior"
            }), /* @__PURE__ */ jsx("li", {
              children: " an option for soothing music"
            }), /* @__PURE__ */ jsx("li", {
              children: " and a built-in scent diffuser for light aromatherapy "
            })]
          }), "to calm the users nerves without removing them from the studying headspace."]
        }), /* @__PURE__ */ jsx("img", {
          id: "bearbot-img",
          src: "app/assets/imgs/bearbot.png",
          alt: "3D rendering of bearbot"
        })]
      }), /* @__PURE__ */ jsxs("video", {
        controls: true,
        children: [/* @__PURE__ */ jsx("source", {
          src: "videos/bearbot_showcase.mp4",
          type: "video/mp4"
        }), /* @__PURE__ */ jsx("source", {
          src: "videos/bearbot_showcase.ogg",
          type: "video/ogg"
        }), "Your browser does not support the video tag."]
      })]
    })]
  });
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(About, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  About,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const settings = UNSAFE_withComponentProps(function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(30);
  const [volume, setVolume] = useState(50);
  const [muteAll, setMuteAll] = useState(false);
  const [deviceName, setDeviceName] = useState("My BearBot");
  const [autoConnect, setAutoConnect] = useState(true);
  const [userName, setUserName] = useState("Student");
  const [dailyGoal, setDailyGoal] = useState(2);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const saveSettings = () => {
    alert("Settings saved!");
  };
  const resetDefaults = () => {
    setDarkMode(false);
    setNotificationsEnabled(true);
    setReminderInterval(30);
    setVolume(50);
    setMuteAll(false);
    setDeviceName("My BearBot");
    setAutoConnect(true);
    setUserName("Student");
    setDailyGoal(2);
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("nav", {
      className: "navbar",
      children: [/* @__PURE__ */ jsx(Link, {
        to: "/mainpage",
        children: "Home"
      }), " |", /* @__PURE__ */ jsx(Link, {
        to: "/",
        children: "Logout"
      })]
    }), /* @__PURE__ */ jsx("h1", {
      className: "bearbot-header",
      children: "Study BearBot Settings"
    }), /* @__PURE__ */ jsxs("div", {
      className: "settings-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "settings-section",
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Appearance"
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "darkMode",
            children: "Dark Mode"
          }), /* @__PURE__ */ jsxs("div", {
            className: "toggle-switch",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              id: "darkMode",
              checked: darkMode,
              onChange: toggleTheme
            }), /* @__PURE__ */ jsx("span", {
              className: "toggle-slider"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "settings-section",
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Notifications"
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "notifications",
            children: "Enable Notifications"
          }), /* @__PURE__ */ jsxs("div", {
            className: "toggle-switch",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              id: "notifications",
              checked: notificationsEnabled,
              onChange: () => setNotificationsEnabled(!notificationsEnabled)
            }), /* @__PURE__ */ jsx("span", {
              className: "toggle-slider"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "reminderInterval",
            children: "Break Reminder (minutes)"
          }), /* @__PURE__ */ jsx("input", {
            type: "range",
            id: "reminderInterval",
            min: "5",
            max: "60",
            step: "5",
            value: reminderInterval,
            onChange: (e) => setReminderInterval(parseInt(e.target.value))
          }), /* @__PURE__ */ jsxs("span", {
            children: [reminderInterval, " minutes"]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "settings-section",
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Sound"
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "volume",
            children: "Volume"
          }), /* @__PURE__ */ jsx("input", {
            type: "range",
            id: "volume",
            min: "0",
            max: "100",
            value: volume,
            onChange: (e) => setVolume(parseInt(e.target.value)),
            disabled: muteAll
          }), /* @__PURE__ */ jsxs("span", {
            children: [volume, "%"]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "muteAll",
            children: "Mute All Sounds"
          }), /* @__PURE__ */ jsxs("div", {
            className: "toggle-switch",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              id: "muteAll",
              checked: muteAll,
              onChange: () => setMuteAll(!muteAll)
            }), /* @__PURE__ */ jsx("span", {
              className: "toggle-slider"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "settings-section",
        children: [/* @__PURE__ */ jsx("h2", {
          children: "Device"
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "deviceName",
            children: "Device Name"
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            id: "deviceName",
            value: deviceName,
            onChange: (e) => setDeviceName(e.target.value)
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "autoConnect",
            children: "Auto-connect on startup"
          }), /* @__PURE__ */ jsxs("div", {
            className: "toggle-switch",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              id: "autoConnect",
              checked: autoConnect,
              onChange: () => setAutoConnect(!autoConnect)
            }), /* @__PURE__ */ jsx("span", {
              className: "toggle-slider"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "settings-section",
        children: [/* @__PURE__ */ jsx("h2", {
          children: "User Profile"
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "userName",
            children: "Your Name"
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            id: "userName",
            value: userName,
            onChange: (e) => setUserName(e.target.value)
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "setting-item",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "dailyGoal",
            children: "Daily Study Goal (hours)"
          }), /* @__PURE__ */ jsx("input", {
            type: "number",
            id: "dailyGoal",
            min: "0.5",
            max: "12",
            step: "0.5",
            value: dailyGoal,
            onChange: (e) => setDailyGoal(parseFloat(e.target.value))
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "settings-buttons",
        children: [/* @__PURE__ */ jsx("button", {
          className: "save-button",
          onClick: saveSettings,
          children: "Save Settings"
        }), /* @__PURE__ */ jsx("button", {
          className: "reset-button",
          onClick: resetDefaults,
          children: "Reset to Defaults"
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings
}, Symbol.toStringTag, { value: "Module" }));
const login = UNSAFE_withComponentProps(function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.username === username && u.password === password);
    console.log("Checking user:", username);
    console.log("Users list:", users);
    console.log("Matched user:", user);
    if (user) {
      localStorage.setItem("loggedInUser", username);
      if (!user.studyHours) {
        user.studyHours = {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0
        };
      }
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/mainpage");
      localStorage.setItem("loggedInUser", username);
    } else {
      alert("Invalid username or password");
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "login-container",
    children: /* @__PURE__ */ jsxs("div", {
      className: "login-card",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "login-header",
        children: [/* @__PURE__ */ jsx("h1", {
          children: "StudyBuddy"
        }), /* @__PURE__ */ jsx("p", {
          children: "Your personalized study companion"
        })]
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleLogin,
        children: [/* @__PURE__ */ jsxs("div", {
          className: "input-group",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "username",
            children: "Username"
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            id: "username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            placeholder: "Enter your username",
            required: true
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "input-group",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "password",
            children: "Password"
          }), /* @__PURE__ */ jsx("input", {
            type: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Enter your password",
            required: true
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          className: "login-button",
          children: "Log In"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "login-footer",
        children: /* @__PURE__ */ jsxs("p", {
          children: ["Don't have an account? ", /* @__PURE__ */ jsx(Link, {
            to: "/signup",
            children: "Sign up"
          })]
        })
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const signup = UNSAFE_withComponentProps(function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      alert("Username already exists!");
      return;
    }
    users.push({
      username,
      password
    });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", username);
    navigate("/mainpage");
  };
  return /* @__PURE__ */ jsx("div", {
    className: "login-container",
    children: /* @__PURE__ */ jsxs("div", {
      className: "login-card",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "login-header",
        children: [/* @__PURE__ */ jsx("h1", {
          children: "Create Your Account"
        }), /* @__PURE__ */ jsx("p", {
          children: "Join BearBot!"
        })]
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSignup,
        children: [/* @__PURE__ */ jsxs("div", {
          className: "input-group",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "username",
            children: "Username"
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            id: "username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            placeholder: "Choose a username",
            required: true
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "input-group",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "password",
            children: "Password"
          }), /* @__PURE__ */ jsx("input", {
            type: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Create a password",
            required: true
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          className: "login-button",
          children: "Sign Up"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "login-footer",
        children: /* @__PURE__ */ jsxs("p", {
          children: ["Already have an account? ", /* @__PURE__ */ jsx("a", {
            href: "/login",
            children: "Log in"
          })]
        })
      })]
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-6Y8hUoHR.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BaRv47m4.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": ["/assets/root-bbf-lIBs.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DftZn9Qk.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": ["/assets/home-Sf4EqBmi.css", "/assets/study-tracker-CRqwmR2l.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/main": { "id": "routes/main", "parentId": "root", "path": "/mainpage", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/main-1TBT3xos.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": ["/assets/study-tracker-CRqwmR2l.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "root", "path": "/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-NpxJsUQt.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": ["/assets/settings-ButRkW60.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "/login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-D0pxTaja.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": ["/assets/login-BOd4oewa.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-CIb_ckUy.js", "imports": ["/assets/chunk-JZWAC4HX-DLkgNyWc.js"], "css": ["/assets/login-BOd4oewa.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-660e47d4.js", "version": "660e47d4", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/main": {
    id: "routes/main",
    parentId: "root",
    path: "/mainpage",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "/login",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
