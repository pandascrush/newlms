import React, { useState } from "react";
import "./Overview.css";

function Overview() {
  const [selectedStory, setSelectedStory] = useState("jimsStory");

  return (
    <div className="container unique-story-container">
      <div className="row unique-story-header">
        <div className="col-6">
          <button
            className={`btn unique-left-btn ${selectedStory === "jimsStory" ? "active" : ""}`}
            onClick={() => setSelectedStory("jimsStory")}
          >
            Jim's Story <br /> Burning the Candle at Both Ends
          </button>
        </div>
        <div className="col-6 text-end">
          <button
            className={`btn unique-right-btn ${selectedStory === "jillsStory" ? "active" : ""}`}
            onClick={() => setSelectedStory("jillsStory")}
          >
            Jill's Story <br /> Rising Strong
          </button>
        </div>
      </div>

      <div className="row unique-story-content mt-4">
        {selectedStory === "jimsStory" && (
          <div className="col-12">
            <h5 className="unique-story-title my-3 text-center">Jim's Story</h5>
            <h5 className="unique-story-subtitle mb-5 text-center">
              BURNING THE CANDLE AT BOTH ENDS
            </h5>
            <div className="unique-story-text">
              <p>
                In a world where work often seems unceasing, Jim's story stands as a
                poignant testament to the all-too-common struggle of burning the
                candle at both ends.
              </p>
              <p>
                A decade ago, Jim joined a corporation, filled with enthusiasm and
                energy. His dedication was unmatched, quickly earning him the
                moniker "The Machine" among his peers. However, as time passed, the
                constant demands began to take their toll, dimming the once bright
                spark of his passion and drive.
              </p>
              <p>
                Picture Jim's daily life: after enduring a day where exhaustion
                clings like a shadow and the echoes of his boss's demands for
                increased productivity linger, he returns home to face yet another
                set of responsibilities. Night after night, he collapses into bed,
                only to be rudely awakened in the early hours, caught in a
                relentless cycle of fatigue.
              </p>
              <p>
                Over the years, this unyielding routine has transformed Jim. The
                'Machine' now seems to be running on its last gear, a vivid analogy
                for a man pushed to his limits. Once a symbol of potential and
                vitality, Jim now resembles a machine neglected and overworked,
                struggling to keep pace with the unending demands.
              </p>
              <p>
                As time progressed, another analogy emerged to depict Jim's plight:
                a tree, heavy and bent under the weight of its own fruit. This
                powerful image captures the essence of his situation – an incessant
                build-up of work and responsibilities, each day adding more strain,
                threatening to break his once sturdy resolve. Jim, much like the
                tree, stands burdened by the very fruits of his labor, finding it
                increasingly difficult to press on.
              </p>
              <p>
                Jim's journey is a stark reminder of the impact excessive work can
                have, not just professionally, but on personal health and
                relationships. It serves as a wake-up call to seek balance, to
                remember our human need for rest, care, and moments of tranquility.
              </p>
            </div>
            <h5 className="unique-story-subtitle my-4 text-center">So, What Could Jim Do?</h5>
            <div className="unique-story-text mb-5">
              <p>
                A potential solution for Jim lies in understanding and caring for his
                spine and overall well-being.
              </p>
              <p>
                Unbeknownst to Jim, back pain and fatigue are global issues, affecting
                a significant portion of the population, sometimes leading to
                permanent disability. Corporations often find themselves financially
                strained due to medical expenses, workers' compensation, and
                disability costs.
              </p>
              <p>
                Enter the "My Spine Coach Course" by Dr. Ken Hansraj. This program
                aims to educate workers globally on strategies to improve their lives.
                Utilizing modern mathematical studies – including research on text
                neck, the impact of belly fat on the spine, and the effects of
                carrying heavy loads – Dr. Hansraj offers guidance on spinal
                alignment. His new book, “Watch Your Back: Nine Proven Strategies to
                Reduce Your Neck and Back Pain,” provides a strategic routine to boost
                body energy and invigorate life. It focuses on reducing the cantilever
                effect and promoting postural alignment. Additionally, his meditation
                series "LIFT: Meditations to Boost Your Back Health" offers
                inspiration for those seeking energy, balance, productivity, and
                happiness.
              </p>
              <p>
                Time, indeed, is a thief. The best moment to plant an oak tree was in
                the past, but the next best time is now. Planting an oak tree, a
                symbol of patience and long-term growth, mirrors the initiation of
                projects that require time and commitment. Starting now promises
                substantial, enduring benefits, underscoring the importance of
                foresight, patience, and investment in the future.
              </p>
            </div>
          </div>
        )}

        {selectedStory === "jillsStory" && (
          <div className="col-12">
            <h5 className="unique-story-title my-3 text-center">Jill's Story</h5>
            <h5 className="unique-story-subtitle mb-5 text-center">
              RISING STRONG
            </h5>
            <div className="unique-story-text">
              <p>
                Jill had always been full of energy. In her younger years, she
                loved the feeling of freedom that came with long walks, dancing,
                or just being outdoors. But as the years passed, she noticed a
                nagging pain in her back, particularly her spine. At first, it was
                a mild inconvenience—something she thought she could brush off. But
                soon, the pain became her constant companion.
              </p>
              <p>
                Doctors diagnosed her with a degenerative spinal condition, a
                problem that wasn’t going to go away. "There’s no cure," they said,
                "but you can manage it." Those words echoed in her mind, and she
                wondered how she would continue her work and keep up with her life
                when even sitting for long periods was unbearable. Daily tasks, once
                so easy, began to feel like obstacles.
              </p>
              <p>
                The pain affected more than just her body. Jill found herself missing
                out on moments that once brought her joy—family gatherings, simple
                social events, even a walk in the park. Her spirit began to wear down,
                feeling confined by a body that no longer felt like her own.
              </p>
              <p>
                But something inside Jill refused to give in. There had to be a way
                to live with this pain without letting it control her life. After a
                particularly difficult day, when getting out of bed felt impossible,
                she had a moment of reflection: I can't change this condition, but I
                can change how I respond to it.
              </p>
              <p>
                She began to seek out ways to reclaim her strength. Doctors introduced
                her to physical therapy and postural training, which taught her how to
                align her body to reduce strain on her spine. Jill realized that how
                she sat, stood, and moved throughout her day mattered more than she
                ever thought.
              </p>
              <p>
                It wasn’t an easy process. There were days when she struggled to
                maintain the right posture or felt frustrated by slow progress. But
                little by little, she noticed changes. With consistent effort, her
                body felt more balanced, and the pain wasn’t as overwhelming. Simple
                movements like standing taller, adjusting how she sat at her desk, or
                using proper techniques when lifting things gave her back a sense of
                control.
              </p>
              <p>
                The postural training became a part of her daily routine. It wasn’t
                just about her spine—it was about rediscovering the strength she
                thought she had lost. Slowly, Jill’s world began to open up again.
                She found that even though her condition was still there, her approach
                to it had changed everything.
              </p>
              <p>
                Jill didn’t face this journey alone. She leaned on friends and family
                for support, and in return, they reminded her that setbacks didn’t
                mean failure. When the pain flared up again, instead of sinking into
                despair, she approached it with a calm acceptance, knowing she had
                tools to help her through.
              </p>
              <p>
                Years later, Jill’s life looks different from how it did before her
                spinal condition began, but it’s not a life of limits. She walks every
                day, appreciating the strength she’s found in a body that isn’t
                perfect but is resilient. Jill’s story is one of rising strong,
                finding new ways to thrive despite the obstacles in her path.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
