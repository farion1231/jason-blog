export default function FontTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">字体测试页面</h1>
      
      {/* Inter Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Inter 字体测试</h2>
        <div className="space-y-3">
          <div className="font-sans font-normal text-lg">
            Regular (400): 这是Inter Regular字体，用于正常文本显示 1234567890
          </div>
          <div className="font-sans font-medium text-lg">
            Medium (500): 这是Inter Medium字体，用于稍微加粗的文本 1234567890
          </div>
          <div className="font-sans font-semibold text-lg">
            SemiBold (600): 这是Inter SemiBold字体，用于半粗体文本 1234567890
          </div>
          <div className="font-sans font-bold text-lg">
            Bold (700): 这是Inter Bold字体，用于粗体文本 1234567890
          </div>
        </div>
      </section>

      {/* JetBrains Mono Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">JetBrains Mono 字体测试</h2>
        <div className="space-y-3">
          <div className="font-mono font-normal text-lg">
            Regular (400): const hello = "world"; // 代码字体测试
          </div>
          <div className="font-mono font-medium text-lg">
            Medium (500): function test() { return "JetBrains Mono"; }
          </div>
          <div className="font-mono font-bold text-lg">
            Bold (700): npm install @types/node --save-dev
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">字体对比测试</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">使用自定义字体：</h3>
            <p className="font-sans">这段文字应该使用 Inter 字体显示，看起来更现代和清晰。</p>
            <code className="font-mono bg-gray-100 px-2 py-1 rounded mt-2 block">
              console.log("JetBrains Mono");
            </code>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">系统默认字体：</h3>
            <p style={{fontFamily: 'system-ui, sans-serif'}}>
              这段文字使用系统默认字体，作为对比参考。
            </p>
            <code style={{fontFamily: 'monospace'}} className="bg-gray-100 px-2 py-1 rounded mt-2 block">
              console.log("System Mono");
            </code>
          </div>
        </div>
      </section>

      {/* Font Loading Debug Info */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">字体加载调试信息</h2>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            请在浏览器开发者工具中检查：
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Network 标签查看字体文件是否成功加载（状态码应该是 200）</li>
            <li>Elements 标签检查 computed styles 中的 font-family</li>
            <li>如果字体文件加载失败（404），说明路径配置有问题</li>
            <li>如果字体文件加载成功但显示效果不明显，可能是字体本身与系统字体相似</li>
          </ul>
        </div>
      </section>
    </div>
  );
}