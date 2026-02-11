<template>
  <!-- 保持模板结构不变 -->
  <div class="bg-white min-h-screen">
    <div class="p-4 max-w-2xl mx-auto">
      <div class="text-xl font-semibold mb-2 text-gray-800 leading-relaxed">
        {{ article.title }}
      </div>

      <div class="flex mb-4 text-sm text-gray-500 pb-2 border-b border-gray-100 items-center">
        <div class="mr-4">{{ article.updateTime }}</div>
        <div class="items-center flex"
          ><var-icon name="view" class="mr-1" :size="16" /><div>{{ article.views + '人' }}</div></div
        >
      </div>

      <div class="article-content text-gray-700 text-base" v-html="article.content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // 数据保持不变
  const article = {
    title: '近视防控，为什么要“早发现、早干预”？',
    views: 101,
    updateTime: '2024-06-01',
    content:
      '<p>近视防控的核心原则是<strong>早发现、早干预</strong>，这是因为近视的发展通常在儿童和青少年时期开始，并且如果不及时采取措施，近视可能会迅速加深，导致更严重的视力问题。以下是为什么要“早发现、早干预”的几个原因：</p>' +
      '<ul>' +
      '<li><b>1. 减缓近视进展</b>：早期发现近视可以帮助采取有效的干预措施，如配戴适当的眼镜、使用特殊的隐形眼镜或进行视觉训练，这些方法可以减缓近视的进展速度。</li>' +
      '<li><b>2. 预防高风险并发症</b>：高度近视可能导致一系列严重的眼部并发症，如视网膜脱落、青光眼和黄斑变性等。通过早期干预，可以降低这些并发症发生的风险。</li>' +
      '<li><b>3. 改善生活质量</b>：近视会影响日常生活和学习，尤其是在儿童和青少年时期。通过早期干预，可以帮助他们更好地适应视觉需求，提高学习效率和生活质量。</li>' +
      '<li><b>4. 降低医疗成本</b>：高度近视及其并发症的治疗成本较高。通过早期干预，可以减少未来可能需要的复杂治疗，从而降低整体医疗成本。</li>' +
      '</ul>' +
      '<div>（下图为儿童视力筛查场景，建议每6个月做一次专业检查）</div>' +
      '<img src="https://qcloud.dpfile.com/pc/w69U5B_b4bAUPn2zK_4HuUhk6lvepLHVtapOJw7HQ5ROEcJR1KDvTAshptWfB8DB.jpg" style="width: 100%; border-radius: 8px;" />' +
      '<p>总之，<strong style="color: #0066CC;">早发现和早干预</strong>是控制近视发展的关键，有助于保护眼睛健康，提升生活质量，并减少未来可能面临的医疗负担。</p>',
  };
</script>

<style scoped lang="scss">
  // 核心修复：解决scoped样式穿透问题 + 增大段间距
  .article-content {
    line-height: 1.8;

    :deep(p) {
      margin: 16px 0 !important;
      line-height: 1.8;
      text-indent: 2em !important;
    }

    ul {
      padding-left: 20px;
      margin: 16px 0 !important;
      line-height: 1.8;
    }

    li {
      margin: 8px 0;
      line-height: 1.8;
    }

    b,
    strong {
      font-weight: 600;
      color: #333;
    }

    :deep(img) {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 16px 0 !important;
      border-radius: 8px;
    }
  }
</style>
