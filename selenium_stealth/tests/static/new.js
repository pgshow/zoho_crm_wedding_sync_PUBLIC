  fpCollect.generateFingerprint().then((fingerprint) => {
    $("#fp").text(JSON.stringify(fingerprint, null, 5));

    let xscanner = fpscanner;
    scannerResults = xscanner.analyseFingerprint(fingerprint);

    for (name in scannerResults) {
      data = scannerResults[name];
      let ok = "FAIL";
      let c = "failed-test";
      if (data.consistent == 2) {
        ok = "WARN";
        c = "warn";
      }
      if (data.consistent == 3) {
        ok = "ok";
        c = "passed";
      }
      $("#fp2").append("<tr><td>" + name + "</td><td class='" + c + "'>" + ok + "</td><td><pre>" + JSON.stringify(data.data, null, 5) + "</pre></td></tr>");
    }
  });





  function utf8_encode(str_data) {	// Encodes an ISO-8859-1 string to UTF-8
    //
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)

    str_data = str_data.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < str_data.length; n++) {
      var c = str_data.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (( c > 127 ) && ( c < 2048 )) {
        utftext += String.fromCharCode(( c >> 6 ) | 192);
        utftext += String.fromCharCode(( c & 63 ) | 128);
      } else {
        utftext += String.fromCharCode(( c >> 12 ) | 224);
        utftext += String.fromCharCode(( ( c >> 6 ) & 63 ) | 128);
        utftext += String.fromCharCode(( c & 63 ) | 128);
      }
    }

    return utftext;
  }


  function crc32(str) {	// Calculates the crc32 polynomial of a string
    //
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)

    str = utf8_encode(str);
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    if (typeof ( crc ) == "undefined") {
      crc = 0;
    }
    var x = 0;
    var y = 0;

    crc = crc ^ ( -1 );
    for (var i = 0, iTop = str.length; i < iTop; i++) {
      y = ( crc ^ str.charCodeAt(i) ) & 0xFF;
      x = "0x" + table.substr(y * 9, 8);
      crc = ( crc >>> 8 ) ^ x;
    }

    return crc ^ ( -1 );
  }

  String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ( ( hash << 5 ) - hash ) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };



runBotDetection = function () {
    var documentDetectionKeys = [
      "__webdriver_evaluate",
      "__selenium_evaluate",
      "__webdriver_script_function",
      "__webdriver_script_func",
      "__webdriver_script_fn",
      "__fxdriver_evaluate",
      "__driver_unwrapped",
      "__webdriver_unwrapped",
      "__driver_evaluate",
      "__selenium_unwrapped",
      "__fxdriver_unwrapped",
      "webdriver",
      "__driver_evaluate",
      "__webdriver_evaluate",
      "__selenium_evaluate",
      "__fxdriver_evaluate",
      "__driver_unwrapped",
      "__webdriver_unwrapped",
      "__selenium_unwrapped",
      "__fxdriver_unwrapped",
      "_Selenium_IDE_Recorder",
      "_selenium",
      "calledSelenium",
      "_WEBDRIVER_ELEM_CACHE",
      "ChromeDriverw",
      "driver-evaluate",
      "webdriver-evaluate",
      "selenium-evaluate",
      "webdriverCommand",
      "webdriver-evaluate-response",
      "__webdriverFunc",
      "__webdriver_script_fn",
      "__$webdriverAsyncExecutor",
      "__lastWatirAlert",
      "__lastWatirConfirm",
      "__lastWatirPrompt",
      "$chrome_asyncScriptInfo",
      "$cdc_asdjflasutopfhvcZLmcfl_"
    ];

    var windowDetectionKeys = [
      "_phantom",
      "__nightmare",
      "_selenium",
      "callPhantom",
      "callSelenium",
      "_Selenium_IDE_Recorder",
    ];

    for (const windowDetectionKey in windowDetectionKeys) {
      const windowDetectionKeyValue = windowDetectionKeys[windowDetectionKey];
      if (window[windowDetectionKeyValue]) {
        return true;
      }
    }
    for (const documentDetectionKey in documentDetectionKeys) {
      const documentDetectionKeyValue = documentDetectionKeys[documentDetectionKey];
      if (window['document'][documentDetectionKeyValue]) {
        return true;
      }
    }

    for (const documentKey in window['document']) {
      if (documentKey.match(/\$[a-z]dc_/) && window['document'][documentKey]['cache_']) {
        return true;
      }
    }

    if (window['external'] && window['external'].toString() && (window['external'].toString()['indexOf']('Sequentum') != -1)) return true;

    if (window['document']['documentElement']['getAttribute']('selenium')) return true;
    if (window['document']['documentElement']['getAttribute']('webdriver')) return true;
    if (window['document']['documentElement']['getAttribute']('driver')) return true;

    return false;
  };

  // User-Agent Test
  const userAgentElement = document.getElementById('user-agent-result');
  userAgentElement.innerHTML = navigator.userAgent;
  if (/HeadlessChrome/.test(navigator.userAgent)) {
    userAgentElement.classList.add('failed-test');
    userAgentElement.classList.remove('passed');
  } else {
    userAgentElement.classList.add('passed');
    userAgentElement.classList.remove('failed-test');
  }

  // Webdriver Test
  const webdriverElement = document.getElementById('webdriver-result');
  if (navigator.webdriver || _.has(navigator, "webdriver")) {
    webdriverElement.classList.add('failed-test');
    webdriverElement.classList.remove('passed');
    webdriverElement.innerHTML = 'present (failed-test)';
  } else {
    webdriverElement.classList.add('passed');
    webdriverElement.classList.remove('failed-test');
    webdriverElement.innerHTML = 'missing (passed)';
  }

  // Advanced Webdriver Test
  const webdriverElement2 = document.getElementById('advanced-webdriver-result');
  if (runBotDetection()) {
    webdriverElement2.classList.add('failed-test');
    webdriverElement2.classList.remove('passed');
    webdriverElement2.innerHTML = 'failed-test';
  } else {
    webdriverElement2.classList.add('passed');
    webdriverElement2.classList.remove('failed-test');
    webdriverElement2.innerHTML = 'passed';
  }

  // Chrome Test
  const chromeElement = document.getElementById('chrome-result');
  if (!window.chrome) {
    chromeElement.classList.add('failed-test');
    chromeElement.classList.remove('passed');
    chromeElement.innerHTML = 'missing (failed-test)';
  } else {
    chromeElement.classList.add('passed');
    chromeElement.classList.remove('failed-test');
    chromeElement.innerHTML = 'present (passed)';
  }

  // Permissions Test
  const permissionsElement = document.getElementById('permissions-result');
  ( async () => {
    const permissionStatus = await navigator.permissions.query({ name: 'notifications' });
    permissionsElement.innerHTML = permissionStatus.state;
    if (Notification.permission === 'denied' && permissionStatus.state === 'prompt') {
      permissionsElement.classList.add('failed-test');
      permissionsElement.classList.remove('passed');
    } else {
      permissionsElement.classList.add('passed');
      permissionsElement.classList.remove('failed-test');
    }
  } )();

  // Plugins Length Test
  const pluginsLengthElement = document.getElementById('plugins-length-result');
  pluginsLengthElement.innerHTML = navigator.plugins.length;
  if (navigator.plugins.length === 0) {
    pluginsLengthElement.classList.add('failed-test');
    pluginsLengthElement.classList.remove('passed');
  } else {
    pluginsLengthElement.classList.add('passed');
    pluginsLengthElement.classList.remove('failed-test');
  }

  // Plugins type Test
  const pluginsTypeElement = document.getElementById('plugins-type-result');
  if (!( navigator.plugins instanceof PluginArray ) || navigator.plugins.length === 0 || window.navigator.plugins[0].toString() !== '[object Plugin]') {
    pluginsTypeElement.classList.add('failed-test');
    pluginsTypeElement.classList.remove('passed');
    pluginsTypeElement.innerText = "failed-test";
  } else {
    pluginsTypeElement.classList.add('passed');
    pluginsTypeElement.classList.remove('failed-test');
    pluginsTypeElement.innerText = "passed";
  }

  // Languages Test
  const languagesElement = document.getElementById('languages-result');
  languagesElement.innerHTML = navigator.languages;
  if (!navigator.languages || navigator.languages.length === 0) {
    languagesElement.classList.add('failed-test');
    languagesElement.classList.remove('passed');
  } else {
    languagesElement.classList.add('passed');
    languagesElement.classList.remove('failed-test');
  }

  // WebGL Tests
  const webGLVendorElement = document.getElementById('webgl-vendor');
  const webGLRendererElement = document.getElementById('webgl-renderer');

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('webgl-experimental');
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    try {
      // WebGL Vendor Test
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      webGLVendorElement.innerHTML = vendor;
      if (vendor === 'Brian Paul' || vendor === "Google Inc.") {
        webGLVendorElement.classList.add('failed-test');
      } else {
        webGLVendorElement.classList.add('passed');
      }
    } catch (e) {
      webGLVendorElement.innerHTML = "Error: " + e;
    }

    try {
      // WebGL Renderer Test
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      webGLRendererElement.innerHTML = renderer;
      if (renderer === 'Mesa OffScreen' || renderer.indexOf("Swift") !== -1) {
        webGLRendererElement.classList.add('failed-test');
      } else
        webGLRendererElement.classList.add('passed');
    } catch (e) {
      webGLRendererElement.innerHTML = "Error: " + e;
    }
  } else {
    webGLVendorElement.innerHTML = "Canvas has no webgl context";
    webGLRendererElement.innerHTML = "Canvas has no webgl context";
    webGLVendorElement.classList.add('failed-test');
    webGLRendererElement.classList.add('failed-test');
  }

  // Hairline Feature Test
  const hairlineFeatureElement = document.getElementById('hairline-feature');
  if (Modernizr.hairline) {
    hairlineFeatureElement.innerHTML = 'present';
    hairlineFeatureElement.classList.add('passed');
  } else {
    hairlineFeatureElement.innerHTML = 'missing';
    hairlineFeatureElement.classList.add('failed-test');
  }

  // Broken Image Dimensions Test
  const brokenImageDimensionsElement = document.getElementById('broken-image-dimensions');
  const body = document.body;
  const image = document.createElement('img');
  image.onerror = function () {
    brokenImageDimensionsElement.innerHTML = `${image.width}x${image.height}`;
    if (image.width == 0 && image.height == 0) {
      brokenImageDimensionsElement.classList.add('failed-test');
    } else {
      brokenImageDimensionsElement.classList.add('passed');
    }
  };
  body.appendChild(image);
  image.src = 'https://intoli.com/nonexistent-image.png';

  let drawCanvas2 = function (num, useIframe = false) {
    var canvas2d;

    /** @type {boolean} */
    var isOkCanvas = true;

    /** @type {string} */
    var canvasText = "Bot test <canvas> 1.1";

    let canvasContainer = document.getElementById("canvas" + num);
    let iframe = document.getElementById("canvas" + num + "-iframe");
    //canvasContainer.appendChild(iframe);

    var canvasElement = useIframe ? iframe.contentDocument.createElement("canvas") : document.createElement("canvas");

    if (canvasElement.getContext) {
      canvas2d = canvasElement.getContext("2d");

      try {
        canvasElement.setAttribute("width", 220);
        canvasElement.setAttribute("height", 30);

        canvas2d.textBaseline = "top";
        canvas2d.font = "14px 'Arial'";
        canvas2d.textBaseline = "alphabetic";
        canvas2d.fillStyle = "#f60";
        canvas2d.fillRect(53, 1, 62, 20);
        canvas2d.fillStyle = "#069";
        canvas2d.fillText(canvasText, 2, 15);
        canvas2d.fillStyle = "rgba(102, 204, 0, 0.7)";
        canvas2d.fillText(canvasText, 4, 17);
      } catch (b) {
        /** @type {!Element} */
        canvasElement = document.createElement("canvas");
        canvas2d = canvasElement.getContext("2d");
        if (void 0 === canvas2d || "function" != typeof canvasElement.getContext("2d").fillText) {
          isOkCanvas = false;
        } else {
          canvasElement.setAttribute("width", 220);
          canvasElement.setAttribute("height", 30);
          /** @type {string} */
          canvas2d.textBaseline = "top";
          /** @type {string} */
          canvas2d.font = "14px 'Arial'";
          /** @type {string} */
          canvas2d.textBaseline = "alphabetic";
          /** @type {string} */
          canvas2d.fillStyle = "#f60";
          canvas2d.fillRect(125, 1, 62, 20);
          /** @type {string} */
          canvas2d.fillStyle = "#069";
          canvas2d.fillText(canvasText, 2, 15);
          /** @type {string} */
          canvas2d.fillStyle = "rgba(102, 204, 0, 0.7)";
          canvas2d.fillText(canvasText, 4, 17);
        }
      }

      if (isOkCanvas && "function" == typeof canvasElement.toDataURL) {
        var datUrl = canvasElement.toDataURL("image/png");
        try {
          if ("boolean" == typeof ( datUrl ) || void 0 === datUrl) {
            throw e;
          }
        } catch (a) {
          /** @type {string} */
          datUrl = "";
        }
        if (0 === datUrl.indexOf("data:image/png")) {

        } else {
          /** @type {boolean} */
          isOkCanvas = false;
        }
      } else {
        /** @type {boolean} */
        isOkCanvas = false;
      }
    } else {
      /** @type {boolean} */
      isOkCanvas = false;
    }


    if (isOkCanvas) {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = "Hash: " + datUrl.hashCode();
      canvasContainer.appendChild(canvasElement);
      canvasContainer.appendChild(newDiv);
    } else {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = "Canvas fail";
      canvasContainer.appendChild(newDiv);
    }
  };

  window.canvasCount = 0;

  drawCanvas2("1");
  drawCanvas2("2");

  drawCanvas2("3", true);
  drawCanvas2("4", true);
  drawCanvas2("5", true);