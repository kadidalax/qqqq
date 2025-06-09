// 管理后台模板
import { adminHeadTemplate } from './admin-head.js';
import { adminBodyTemplate } from './admin-body.js';
import { adminScriptTemplate } from './admin-script.js';

export const adminTemplate = `${adminHeadTemplate}${adminBodyTemplate}
<!-- Vue 3 -->
<script src="https://unpkg.com/vue@3.2.31/dist/vue.global.prod.js"></script>
${adminScriptTemplate}
</body>
</html>`; 