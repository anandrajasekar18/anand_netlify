(() => {
  // <stdin>
  /*! Wowchemy v5.1.0 | https://wowchemy.com/ */
  /*! Copyright 2016-present George Cushen (https://georgecushen.com/) */
  /*! License: https://github.com/wowchemy/wowchemy-hugo-modules/blob/main/LICENSE.md */
  (() => {
    var body = document.body;
    function getThemeMode() {
      return parseInt(localStorage.getItem("wcTheme") || 2);
    }
    function canChangeTheme() {
      return Boolean(window.wc.darkLightEnabled);
    }
    function initThemeVariation() {
      if (!canChangeTheme()) {
        console.debug("User theming disabled.");
        return {
          isDarkTheme: window.wc.isSiteThemeDark,
          themeMode: window.wc.isSiteThemeDark ? 1 : 0
        };
      }
      console.debug("User theming enabled.");
      let isDarkTheme;
      let currentThemeMode = getThemeMode();
      console.debug(`User's theme variation: ${currentThemeMode}`);
      switch (currentThemeMode) {
        case 0:
          isDarkTheme = false;
          break;
        case 1:
          isDarkTheme = true;
          break;
        default:
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            isDarkTheme = true;
          } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            isDarkTheme = false;
          } else {
            isDarkTheme = window.wc.isSiteThemeDark;
          }
          break;
      }
      if (isDarkTheme && !body.classList.contains("dark")) {
        console.debug("Applying Wowchemy dark theme");
        document.body.classList.add("dark");
      } else if (!isDarkTheme && body.classList.contains("dark")) {
        console.debug("Applying Wowchemy light theme");
        document.body.classList.remove("dark");
      }
      return {
        isDarkTheme,
        themeMode: currentThemeMode
      };
    }
    var wcDarkLightEnabled = true;
    var wcIsSiteThemeDark = false;
    window.wc = {
      darkLightEnabled: wcDarkLightEnabled,
      isSiteThemeDark: wcIsSiteThemeDark
    };
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    initThemeVariation();
    window.PlotlyConfig = {MathJaxConfig: "local"};
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyohIFdvd2NoZW15IHY1LjEuMCB8IGh0dHBzOi8vd293Y2hlbXkuY29tLyAqL1xuLyohIENvcHlyaWdodCAyMDE2LXByZXNlbnQgR2VvcmdlIEN1c2hlbiAoaHR0cHM6Ly9nZW9yZ2VjdXNoZW4uY29tLykgKi9cbi8qISBMaWNlbnNlOiBodHRwczovL2dpdGh1Yi5jb20vd293Y2hlbXkvd293Y2hlbXktaHVnby1tb2R1bGVzL2Jsb2IvbWFpbi9MSUNFTlNFLm1kICovXG5cbjtcbigoKSA9PiB7XG4gIC8vIG5zLWh1Z286L3RtcC9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3dvd2NoZW15L3dvd2NoZW15LWh1Z28tbW9kdWxlcy93b3djaGVteUB2MC4wLjAtMjAyMTAzMjQxOTQyMDAtZmRhOWYzOWQ4NzJlL2Fzc2V0cy9qcy93b3djaGVteS10aGVtaW5nLmpzXG4gIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgZnVuY3Rpb24gZ2V0VGhlbWVNb2RlKCkge1xuICAgIHJldHVybiBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndjVGhlbWVcIikgfHwgMik7XG4gIH1cbiAgZnVuY3Rpb24gY2FuQ2hhbmdlVGhlbWUoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4od2luZG93LndjLmRhcmtMaWdodEVuYWJsZWQpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXRUaGVtZVZhcmlhdGlvbigpIHtcbiAgICBpZiAoIWNhbkNoYW5nZVRoZW1lKCkpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJVc2VyIHRoZW1pbmcgZGlzYWJsZWQuXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNEYXJrVGhlbWU6IHdpbmRvdy53Yy5pc1NpdGVUaGVtZURhcmssXG4gICAgICAgIHRoZW1lTW9kZTogd2luZG93LndjLmlzU2l0ZVRoZW1lRGFyayA/IDEgOiAwXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zb2xlLmRlYnVnKFwiVXNlciB0aGVtaW5nIGVuYWJsZWQuXCIpO1xuICAgIGxldCBpc0RhcmtUaGVtZTtcbiAgICBsZXQgY3VycmVudFRoZW1lTW9kZSA9IGdldFRoZW1lTW9kZSgpO1xuICAgIGNvbnNvbGUuZGVidWcoYFVzZXIncyB0aGVtZSB2YXJpYXRpb246ICR7Y3VycmVudFRoZW1lTW9kZX1gKTtcbiAgICBzd2l0Y2ggKGN1cnJlbnRUaGVtZU1vZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgaXNEYXJrVGhlbWUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlzRGFya1RoZW1lID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICBpc0RhcmtUaGVtZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgaXNEYXJrVGhlbWUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0RhcmtUaGVtZSA9IHdpbmRvdy53Yy5pc1NpdGVUaGVtZURhcms7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpc0RhcmtUaGVtZSAmJiAhYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXJrXCIpKSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiQXBwbHlpbmcgV293Y2hlbXkgZGFyayB0aGVtZVwiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImRhcmtcIik7XG4gICAgfSBlbHNlIGlmICghaXNEYXJrVGhlbWUgJiYgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXJrXCIpKSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiQXBwbHlpbmcgV293Y2hlbXkgbGlnaHQgdGhlbWVcIik7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNEYXJrVGhlbWUsXG4gICAgICB0aGVtZU1vZGU6IGN1cnJlbnRUaGVtZU1vZGVcbiAgICB9O1xuICB9XG5cbiAgLy8gbnMtcGFyYW1zOkBwYXJhbXNcbiAgdmFyIHdjRGFya0xpZ2h0RW5hYmxlZCA9IHRydWU7XG4gIHZhciB3Y0lzU2l0ZVRoZW1lRGFyayA9IGZhbHNlO1xuXG4gIC8vIDxzdGRpbj5cbiAgd2luZG93LndjID0ge1xuICAgIGRhcmtMaWdodEVuYWJsZWQ6IHdjRGFya0xpZ2h0RW5hYmxlZCxcbiAgICBpc1NpdGVUaGVtZURhcms6IHdjSXNTaXRlVGhlbWVEYXJrXG4gIH07XG4gIGlmICh3aW5kb3cubmV0bGlmeUlkZW50aXR5KSB7XG4gICAgd2luZG93Lm5ldGxpZnlJZGVudGl0eS5vbihcImluaXRcIiwgKHVzZXIpID0+IHtcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB3aW5kb3cubmV0bGlmeUlkZW50aXR5Lm9uKFwibG9naW5cIiwgKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9hZG1pbi9cIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaW5pdFRoZW1lVmFyaWF0aW9uKCk7XG4gIHdpbmRvdy5QbG90bHlDb25maWcgPSB7TWF0aEpheENvbmZpZzogXCJsb2NhbFwifTtcbn0pKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBO0FBQ0E7QUFDQTtBQUdBLEVBQUMsT0FBTTtBQUVMLFFBQUksT0FBTyxTQUFTO0FBQ3BCLDRCQUF3QjtBQUN0QixhQUFPLFNBQVMsYUFBYSxRQUFRLGNBQWM7QUFBQTtBQUVyRCw4QkFBMEI7QUFDeEIsYUFBTyxRQUFRLE9BQU8sR0FBRztBQUFBO0FBRTNCLGtDQUE4QjtBQUM1QixVQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGdCQUFRLE1BQU07QUFDZCxlQUFPO0FBQUEsVUFDTCxhQUFhLE9BQU8sR0FBRztBQUFBLFVBQ3ZCLFdBQVcsT0FBTyxHQUFHLGtCQUFrQixJQUFJO0FBQUE7QUFBQTtBQUcvQyxjQUFRLE1BQU07QUFDZCxVQUFJO0FBQ0osVUFBSSxtQkFBbUI7QUFDdkIsY0FBUSxNQUFNLDJCQUEyQjtBQUN6QyxjQUFRO0FBQUEsYUFDRDtBQUNILHdCQUFjO0FBQ2Q7QUFBQSxhQUNHO0FBQ0gsd0JBQWM7QUFDZDtBQUFBO0FBRUEsY0FBSSxPQUFPLFdBQVcsZ0NBQWdDLFNBQVM7QUFDN0QsMEJBQWM7QUFBQSxxQkFDTCxPQUFPLFdBQVcsaUNBQWlDLFNBQVM7QUFDckUsMEJBQWM7QUFBQSxpQkFDVDtBQUNMLDBCQUFjLE9BQU8sR0FBRztBQUFBO0FBRTFCO0FBQUE7QUFFSixVQUFJLGVBQWUsQ0FBQyxLQUFLLFVBQVUsU0FBUyxTQUFTO0FBQ25ELGdCQUFRLE1BQU07QUFDZCxpQkFBUyxLQUFLLFVBQVUsSUFBSTtBQUFBLGlCQUNuQixDQUFDLGVBQWUsS0FBSyxVQUFVLFNBQVMsU0FBUztBQUMxRCxnQkFBUSxNQUFNO0FBQ2QsaUJBQVMsS0FBSyxVQUFVLE9BQU87QUFBQTtBQUVqQyxhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsV0FBVztBQUFBO0FBQUE7QUFLZixRQUFJLHFCQUFxQjtBQUN6QixRQUFJLG9CQUFvQjtBQUd4QixXQUFPLEtBQUs7QUFBQSxNQUNWLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBO0FBRW5CLFFBQUksT0FBTyxpQkFBaUI7QUFDMUIsYUFBTyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsU0FBUztBQUMxQyxZQUFJLENBQUMsTUFBTTtBQUNULGlCQUFPLGdCQUFnQixHQUFHLFNBQVMsTUFBTTtBQUN2QyxxQkFBUyxTQUFTLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtqQztBQUNBLFdBQU8sZUFBZSxDQUFDLGVBQWU7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
