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
