# English:

# WebGL-GPU-Detector

A lightweight browser WebGL GPU hardware acceleration detection component, used to determine whether the current browser has WebGL GPU hardware acceleration enabled.

## Features

This component detects the browser's rendering backend through the WebGL API, with the following core functions:
- Detect whether the browser supports WebGL or Experimental-WebGL context
- Determine if the current browser has WebGL GPU hardware acceleration enabled
- If hardware acceleration is not detected, automatically pop up a prompt to guide users to enable the browser's hardware acceleration function and restart

---

## Usage

The component has no dependencies on other libraries and is simple to use, supporting two integration methods:

1. **Directly embed in HTML**
Copy the provided complete `<script>` tag directly into the `<head>` or `<body>` tag of the HTML page. The component will automatically perform detection after the page loads.

2. **Import JS file**
Save the script content as an independent JS file (e.g., `gpu-detector.js`), and import it in the page via the `<script>` tag. The component will automatically initialize detection after the file loads.

---

## Code Snippet

The complete detection script is as follows:

```javascript
<script>
    function isHardwareGpuAccelerated() {
        if (!window.WebGLRenderingContext) {
            return false;
        }
        let canvas = null;
        try {
            canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl', {
                powerPreference: 'high-performance',
                preserveDrawingBuffer: false
            }) || canvas.getContext('experimental-webgl', { powerPreference: 'high-performance' });

            if (!gl) return false;

            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (!ext) return false;
            const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
            const softwareKeywords = ['software', 'swiftshader', 'llvmpipe', 'microsoft basic render driver'];
            return !softwareKeywords.some(keyword => renderer.includes(keyword));
        } catch (e) {
            console.error('GPU acceleration detection exception');
            return false;
        } finally {
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
    }
    function runDetection() {
        setTimeout(() => {
            const isAccelerated = isHardwareGpuAccelerated();
            if (isAccelerated) {
                return;
            }
            alert('No browser GPU acceleration support detected 😥, which may cause page lag\nPlease go to browser settings to enable options like\n"Use graphics acceleration when available" or "Hardware acceleration"\nAfter enabling, please restart the browser');
        }, 3000);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runDetection);
    } else {
        runDetection();
    }
</script>
```

---

## Detection Logic

1. **Environment Check**: First determine if the browser supports `WebGLRenderingContext`. If not, directly determine that hardware acceleration is not enabled.
2. **WebGL Context Creation**: Attempt to create a `webgl` or `experimental-webgl` context, specifying high-performance preference parameters.
3. **Renderer Information Acquisition**: Obtain graphics card renderer information through the `WEBGL_debug_renderer_info` extension.
4. **Acceleration Status Judgment**: Determine whether WebGL GPU hardware acceleration is enabled based on the renderer information.

---

## Notes

- Some browsers may restrict access to the `WEBGL_debug_renderer_info` extension due to privacy settings or security policies, in which case it will be determined that hardware acceleration is not enabled.
- Detection will be executed 3 seconds after the page finishes loading to avoid affecting page initialization performance.
- The temporary `canvas` element created by the component will be automatically cleaned up after detection, leaving no residual DOM nodes.
- Note that since the created `canvas` is not added to the DOM tree (no `appendChild` is executed after `document.createElement`), `canvas.parentNode` is always `null`, so the cleanup logic in the `finally` block will not actually execute. If needed, this part of the code can be simplified.

---

# 中文：

# WebGL-GPU-Detector

一个轻量级的浏览器WebGL GPU硬件加速检测组件，用于判断当前浏览器是否启用了WebGL GPU硬件加速

## 功能说明

该组件通过WebGL API检测浏览器的渲染后端，核心功能如下：
- 检测浏览器是否支持WebGL或Experimental-WebGL上下文
- 判断当前浏览器是否启用了WebGL GPU硬件加速
- 若未检测到硬件加速，自动弹出提示，引导用户开启浏览器硬件加速功能并重启

---

## 使用方法

组件无需依赖其他库，使用方式简单直接，支持两种集成方式：

1. **直接嵌入HTML**
将提供的完整`<script>`标签直接复制粘贴到HTML页面的`<head>`或`<body>`标签内，组件会在页面加载完成后自动执行检测

2. **引入JS文件**
将脚本内容保存为独立的JS文件（如`gpu-detector.js`），通过`<script>`标签在页面中引入，组件会在文件加载完成后自动初始化检测

---

## 代码片段

完整的检测脚本如下：

```javascript
<script>
    function isHardwareGpuAccelerated() {
        if (!window.WebGLRenderingContext) {
            return false;
        }
        let canvas = null;
        try {
            canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl', {
                powerPreference: 'high-performance',
                preserveDrawingBuffer: false
            }) || canvas.getContext('experimental-webgl', { powerPreference: 'high-performance' });

            if (!gl) return false;

            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (!ext) return false;
            const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
            const softwareKeywords = ['software', 'swiftshader', 'llvmpipe', 'microsoft basic render driver'];
            return !softwareKeywords.some(keyword => renderer.includes(keyword));
        } catch (e) {
            console.error('GPU加速检测异常');
            return false;
        } finally {
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
    }
    function runDetection() {
        setTimeout(() => {
            const isAccelerated = isHardwareGpuAccelerated();
            if (isAccelerated) {
                return;
            }
            alert('未检测到浏览器GPU加速支持😥，这可能会导致页面有卡顿\n请前往浏览器设置页面开启类似\n“在可用时使用图形加速”或“硬件加速”\n的选项，开启后请重启浏览器');
        }, 3000);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runDetection);
    } else {
        runDetection();
    }
</script>
```

---

## 检测逻辑

1. **环境检查**：首先判断浏览器是否支持`WebGLRenderingContext`，不支持则直接判定为未启用硬件加速
2. **WebGL上下文创建**：尝试创建`webgl`或`experimental-webgl`上下文，并指定高性能偏好参数
3. **渲染器信息获取**：通过`WEBGL_debug_renderer_info`扩展获取显卡渲染器信息
4. **加速状态判断**：基于渲染器信息判断是否启用了WebGL GPU硬件加速

---

## 注意事项

- 部分浏览器可能因隐私设置或安全策略限制`WEBGL_debug_renderer_info`扩展的访问，此时会判定为未启用硬件加速
- 检测会在页面加载完成后延迟3秒执行，避免影响页面初始化性能
- 组件创建的临时`canvas`元素会在检测结束后自动清理，不会残留DOM节点
- 需注意，由于创建的`canvas`未添加到DOM树（`document.createElement`后未执行`appendChild`），`canvas.parentNode`始终为`null`，因此`finally`块中的清理逻辑实际不会执行，如有需要可对该部分代码进行简化
