

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//       text: "OFF",
//     });
//     chrome.action.setBadgeBackgroundColor({
//         color:"red",
//     })
//   });


 
//   function reddenPage() {
//     document.body.style.backgroundColor = 'red';
//   }
  
//   chrome.action.onClicked.addListener((tab) => {
//     console.log("test");
//     if (!tab.url.includes('chrome://')) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: reddenPage
//       });
//     }
//   });

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
        });

        if (nextState === "ON") {
          // Insert the CSS file when the user turns the extension on
          await chrome.scripting.insertCSS({
            files: ["focus_mode.css"],
            target: { tabId: tab.id },
          });
        } else if (nextState === "OFF") {
          // Remove the CSS file when the user turns the extension off
          await chrome.scripting.removeCSS({
            files: ["focus_mode.css"],
            target: { tabId: tab.id },
          });
        }
      }
    
 }
)


// chrome.action.onClicked.addListener((tab) => {
  
//     chrome.tabs.create({url: "https://www.youtube.com"});
// console.log(chrome.tabs);
//   });
  
