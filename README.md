# English:

# WebGL-GPU-Detector

A lightweight browser WebGL GPU hardware acceleration detection component, used to determine whether the current browser has enabled real GPU hardware acceleration instead of software-emulated acceleration.

## Feature Description

This component detects the browser's rendering backend through the WebGL API, with the following core features:
- Detect whether the browser supports WebGL or Experimental-WebGL context.
- Determine if the current rendering uses real GPU hardware acceleration, excluding software rendering (e.g., SwiftShader, LLVMPipe).
- If hardware acceleration is not detected, an automatic prompt will pop up to guide the user to enable the browser's hardware acceleration feature and restart the browser.

---

## Usage

The component has no dependencies on other libraries and is simple to use, supporting two integration methods:

1. **Directly Embed in HTML**
Copy and paste the provided complete `<script>` tag directly into the `<head>` or `<body>` tag of the HTML page. The component will automatically execute the detection after the page loads.

2. **Import JS File**
Save the script content as an independent JS file (e.g., `gpu-detector.js`), and import it in the page via the `<script>` tag. The component will automatically initialize the detection after the file is loaded.

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

## Detection Logic

1. **Environment Check**: First, determine if the browser supports `WebGLRenderingContext`. If not, it is directly judged that hardware acceleration is not enabled.
2. **WebGL Context Creation**: Attempt to create a `webgl` or `experimental-webgl` context and specify high-performance preference parameters.
3. **Renderer Information Acquisition**: Obtain graphics card renderer information through the `WEBGL_debug_renderer_info` extension.
4. **Software Rendering Exclusion**: Check if the renderer information contains software rendering keywords (e.g., `software`, `swiftshader`). If included, it is judged that hardware acceleration is not enabled.

---

## Notes

- Some browsers may restrict access to the `WEBGL_debug_renderer_info` extension due to privacy settings or security policies, in which case it will be judged that hardware acceleration is not enabled.
- The detection will be executed with a 3-second delay after the page loads to avoid affecting page initialization performance.
- The temporary `canvas` element created by the component will be automatically cleaned up after the detection ends, leaving no residual DOM nodes.
- Note that since the created `canvas` is not added to the DOM tree (no `appendChild` is executed after `document.createElement`), `canvas.parentNode` is always `null`, so the cleanup logic in the `finally` block does not actually execute. This part of the code can be simplified if needed.

---

# 中文

# WebGL-GPU-Detector

一个轻量级的浏览器WebGL GPU硬件加速检测组件，用于判断当前浏览器是否启用了真实的GPU硬件加速，而非软件模拟加速

## 功能说明

该组件通过WebGL API检测浏览器的渲染后端，核心功能如下：
- 检测浏览器是否支持WebGL或Experimental-WebGL上下文
- 判断当前渲染是否使用真实GPU硬件加速，排除软件渲染（如SwiftShader、LLVMPipe等）
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
4. **软件渲染排除**：检查渲染器信息中是否包含软件渲染关键词（如`software`、`swiftshader`），包含则判定为未启用硬件加速

---

## 注意事项

- 部分浏览器可能因隐私设置或安全策略限制`WEBGL_debug_renderer_info`扩展的访问，此时会判定为未启用硬件加速
- 检测会在页面加载完成后延迟3秒执行，避免影响页面初始化性能
- 组件创建的临时`canvas`元素会在检测结束后自动清理，不会残留DOM节点
- 需注意，由于创建的`canvas`未添加到DOM树（`document.createElement`后未执行`appendChild`），`canvas.parentNode`始终为`null`，因此`finally`块中的清理逻辑实际不会执行，如有需要可对该部分代码进行简化
